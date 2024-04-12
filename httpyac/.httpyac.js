module.exports = {
  environments: {
    local: {
      url: "http://localhost:3000",
    },
    docker: {
      url: "http://host.docker.internal:3000",
    },
    dev: {
      url: "https://living-requirements.ambitiousisland-f3762769.uksouth.azurecontainerapps.io",
    },
  },
};
