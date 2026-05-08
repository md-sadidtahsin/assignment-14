package k8s

# Deny if a container has no resource limits
deny[msg] {
  container := input.spec.containers[_]
  not container.resources.limits
  msg := sprintf("Container %s must define resource limits", [container.name])
}
