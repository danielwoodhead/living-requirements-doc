import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { IBadgeClient } from './badge.client';
import { AxiosResponse, isAxiosError } from 'axios';

@Injectable()
export class ShieldsIOBadgeClient implements IBadgeClient {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getBadge(
    label: string,
    message: string,
    color: string,
  ): Promise<ArrayBuffer> {
    const url = `${this.configService.get('SHIELDS_IO_URL')}/badge/${label}-${message}-${color}`;

    let response: AxiosResponse<ArrayBuffer, any>;
    try {
      response = await this.httpService.axiosRef.get(url, {
        responseType: 'arraybuffer',
      });
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw new Error(`${error.response.status} ${error.response.data}`);
      }
      throw error;
    }

    return response.data;
  }
}
