The Devicon project is living through its [contributors](https://github.com/devicons/devicon/graphs/contributors) and [maintainers](https://github.com/orgs/devicons/people). Everyone can and is asked to contribute to this project. You **don't** have to be in a team to contribute!

Wanna join the team? Please apply using [this discussion](https://github.com/devicons/devicon/discussions/1436). New member requests have to be approved by all active members of the **__maintain** and **__admin** teams for the repository in question. Every member of this team has a veto permission to reject a new member.

For organizational purposes we introduced [teams](https://github.com/orgs/devicons/teams) with permissions and responsibilities:

## Teams

The teams are set up as follows:
1. There's one "root-level" team for each repository in our GitHub organization. This team will be suffixed by `__reviewers`. For example: [@devicons/devicon__reviewers
](https://github.com/orgs/devicons/teams/devicon__reviewers)
2. Each "root-level" team has nested teams inside of it. One for each of these [roles/access levels](https://docs.github.com/en/organizations/managing-user-access-to-your-organizations-repositories/managing-repository-roles/repository-roles-for-an-organization#permissions-for-each-role): `triage`, `maintain`, `admin`. These teams will be suffixed with `__{access_level}`, for example: [@devicons/devicon__admin](https://github.com/orgs/devicons/teams/devicon__admin).

When new "maintainers" are added, they will first be added to the `__triage` team. If they do a good job, and show themselves to be trustworthy, they will get more access as time goes on.

## Responsibilities

Maintainers with `triage` role or higher are expected to:
1. Review and help contributors with Pull Requests
2. Review and help contributors with Issues
3. Add the `_reviewers` team as a reviewer once they've reviewed the PR themself.

Maintainers with `maintain` role are additionally expected to:
1. Make new releases
2. On-board new maintainers
3. Update the wiki whenever necessary

## Additional info

The branches `master` and `develop` are protected branches and only members of the `__maintain` or `__admin` teams are able to push changes to them. Additional branches <b>must</b> follow the pattern <code><i>username</i>/feature/<i>description</i></code>. The `/feature/` indicates that a change is made to existing code (regardless if it's a fix, refactor or actual feature). The naming convention is based on the _gitflow_\-workflow.
