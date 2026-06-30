output "managed_repos" {
  description = "List of managed repository names"
  value       = keys(github_repository.managed)
}

output "protected_branches" {
  description = "List of repos with branch protection"
  value       = keys(github_branch_protection.managed)
}
