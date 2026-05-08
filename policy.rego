package policy

# Rule: deny if Docker image tag is "latest"
docker_deny[msg] {
  input.image.tag == "latest"
  msg := "Docker images must not use 'latest' tag"
}


