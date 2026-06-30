terraform {
  required_providers {
    github = {
      source  = "integrations/github"
      version = "~> 6.0"
    }
  }
}

provider "github" {
  owner = "basel5001"
}

locals {
  repos = yamldecode(file("${path.module}/../repos.yml"))
}

resource "github_repository" "managed" {
  for_each = local.repos.repos

  name                   = each.key
  description            = try(each.value.description, "")
  visibility             = try(each.value.visibility, local.repos.defaults.visibility)
  delete_branch_on_merge = try(each.value.delete_branch_on_merge, local.repos.defaults.delete_branch_on_merge)
  has_issues             = try(each.value.has_issues, local.repos.defaults.has_issues)
  has_wiki               = try(each.value.has_wiki, local.repos.defaults.has_wiki)
  has_projects           = try(each.value.has_projects, local.repos.defaults.has_projects)
  allow_squash_merge     = try(each.value.allow_squash_merge, local.repos.defaults.allow_squash_merge)
  allow_merge_commit     = try(each.value.allow_merge_commit, local.repos.defaults.allow_merge_commit)
  allow_rebase_merge     = try(each.value.allow_rebase_merge, local.repos.defaults.allow_rebase_merge)
  vulnerability_alerts   = try(each.value.vulnerability_alerts, local.repos.defaults.vulnerability_alerts)

  lifecycle {
    ignore_changes = [
      auto_init,
      template,
      pages,
      security_and_analysis,
    ]
  }
}

resource "github_branch_protection" "managed" {
  for_each = {
    for name, repo in local.repos.repos :
    name => repo
    if try(repo.visibility, local.repos.defaults.visibility) == "public"
  }

  repository_id = github_repository.managed[each.key].node_id
  pattern       = try(each.value.default_branch, "main")

  enforce_admins = try(
    each.value.branch_protection.enforce_admins,
    local.repos.defaults.branch_protection.enforce_admins
  )

  required_pull_request_reviews {
    required_approving_review_count = try(
      each.value.branch_protection.required_reviews,
      local.repos.defaults.branch_protection.required_reviews
    )
    dismiss_stale_reviews = try(
      each.value.branch_protection.dismiss_stale_reviews,
      local.repos.defaults.branch_protection.dismiss_stale_reviews
    )
    require_code_owner_reviews = try(
      each.value.branch_protection.require_code_owner_reviews,
      local.repos.defaults.branch_protection.require_code_owner_reviews
    )
  }
}
