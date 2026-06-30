# An Interactive Bash Script for Linux User and Group Management

**TL;DR:** I built an interactive bash script that handles the most common Linux user and group administration tasks -- creating users, managing groups, setting permissions, and bulk operations -- through a menu-driven interface.

## The Problem

Linux user management is straightforward if you have the commands memorized. But for junior admins, students, or anyone who does not manage Linux systems daily, remembering the exact syntax for `useradd`, `usermod`, `groupadd`, `passwd`, and their various flags is a constant trip to the man pages. One wrong flag and you have locked out a user or assigned the wrong shell. I wanted a tool that makes these operations safe and accessible while still being educational about what is happening under the hood.

## What I Built

`bash-scripting` is an interactive menu-driven bash script for managing Linux users and groups. It wraps the standard Linux user management commands in a guided interface that validates input, confirms destructive actions, and logs everything it does.

- **User creation** -- creates users with configurable home directories, shells, and group memberships. Validates that usernames follow naming conventions and prompts for password setup
- **User modification** -- change shells, lock/unlock accounts, update group memberships, set password expiration policies, and modify home directories
- **User deletion** -- removes users with optional home directory cleanup, confirms before executing, and logs the removal
- **Group management** -- create, delete, and rename groups. Add or remove users from groups interactively
- **Bulk operations** -- import a CSV of users and create them all in one run, or export the current user list to CSV for auditing
- **Password management** -- force password resets, set expiration policies, and check password status across users
- **Audit logging** -- every action is logged to `/var/log/user-management.log` with timestamps and the admin who ran it
- **Dry-run mode** -- preview exactly what commands will execute before running them

## Tech Stack

Bash, Linux (useradd, usermod, groupadd, passwd, chage), AWK, CSV parsing

## Usage

```bash
# Run interactively
sudo ./user-manager.sh

# Bulk create users from CSV
sudo ./user-manager.sh --bulk-create users.csv

# Dry run
sudo ./user-manager.sh --dry-run

# CSV format: username,fullname,shell,groups
# john.doe,John Doe,/bin/bash,developers;sudo
```

## Results

This script has been used as a teaching tool in a Linux administration course where students practice user management without risking misconfigured commands. The dry-run mode catches roughly one mistake per session that would have required manual cleanup. Bulk user creation from CSV reduced onboarding time for a 15-person lab setup from 45 minutes of manual work to under 2 minutes. The audit log has proven useful for tracking who made what changes during group lab exercises.

---

GitHub: https://github.com/basel5001/Bash-Scripting
