The Devicon project is living through its contributors and [maintainers](https://github.com/orgs/devicons/people). Everyone can and is asked to contribute to this project. You **don't** have to be in a team to contribute!

For organizational purposes we introduced [teams](https://github.com/orgs/devicons/teams) with permissions and responsibilities:

1. **Supporter** (@devicons/supporter)

  - Members of this team are responsible for reviewing pull request (auto assigned), managing issues and preparing the upcoming release. Usually, they don't create icons themselves but they can if they wish.

  - Supporters have `Write` access to the repository (allowing them to create own branches) and are allowed to push changes to the `develop` branch (pull request and status checks required). They can also add new features to the repository after their PRs are properly reviewed. 

2. **Maintainer** (@devicons/maintainer)

  - Maintainer role inherits from the 'Supporter' role and adds `Maintainer` permission to the repository. Members of this team are allowed to publish a new release (push `master` branch after pull request and status checks). They can also add new features to the repository after their PRs are properly reviewed. Usually, they don't create icons themselves but they can if they wish.

3. **Contributors**

  - These are people who contributed to the repo but don't stay with the repo as a Supporter or Maintainer. This could be someone who submit icons PR, contributes to discussions, or assist with various other tasks. This is where the majority of our icons come from.

The branches `master` and `develop` are protected branches and only members with corresponding permissions (see teams below) are able to push changes to them. Additional branches **must** follow the pattern `_username_/feature/_description_`. The `/feature/` indicates that a change is made to existing code (regardless if it's a fix, refactor or actual feature). The naming convention is based on the _gitflow_\-workflow.

Wanna join the team? Please [open a public discussion](https://github.com/devicons/devicon/discussions/new) where you introduce yourself.  
New member requests have to be approved by all active members of the team **Maintainer**. Every member of this team has a veto permission to reject a new member.