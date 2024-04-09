module.exports = {
  environments: {
    local: {
      url: "http://localhost:3000",
    },
    docker: {
      url: "http://host.docker.internal:3000",
    },
  },
};
