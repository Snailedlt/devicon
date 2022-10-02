import re
from build_assets import arg_getters, api_handler

def main():
	args = arg_getters.get_in_develop_labeler_args()
	try:
		print(f"body: {args.body}")
		print("test")
		print("test develop")
		print(args.body.split("\n"))
		# find the issue closing line
		issue_line = ""
		for line in args.body.splitlines():
			print(line)
			if line.startswith("**This PR closes")[0]:
				issue_line = line
				break
			raise IndexError()

		print("Issue Line is " + issue_line)
		issue_pattern = re.compile(r"\d+")
		issues_numbers = issue_pattern.findall(issue_line)
		print("Labelling issues: " + str(issues_numbers))
		api_handler.label_issues(args.token, issues_numbers, ["in-develop"])
	except IndexError:  # if can't find the issue line
		print("The PR body doesn't contain `**This PR closes` keywords. Ending workflow.")
		return

if __name__ == "__main__":
	main()
