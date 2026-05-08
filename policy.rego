package policy

docker_deny contains msg if {
    input.image.tag == "latest"
    msg := "latest tag is not allowed"
}

docker_deny contains msg if {
    not input.image.tag
    msg := "image tag is required"
}