module.exports = {
  environments: {
    local: {
      url: "http://localhost:3000",
      shieldsUrl: "http://host.docker.internal:3001",
    },
    docker: {
      url: "http://host.docker.internal:3000",
    },
    dev: {
      url: "https://living-requirements.ambitiousisland-f3762769.uksouth.azurecontainerapps.io",
    },
  },
};
