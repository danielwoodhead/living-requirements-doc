export interface IBadgeClient {
  getBadge(label: string, message: string, color: string): Promise<ArrayBuffer>;
}
