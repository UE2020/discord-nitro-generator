import requests, string, json, time, random

proxies = {

}

def check_code(code, proxies):
	while True:
		r = requests.get('https://discord.com/api/v6/entitlements/gift-codes/' + code, proxies=proxies)
		print(r.text)
		result = json.loads(r.text)
		if "message" in result:
			if result["message"] == "You are being rate limited.":
				print("======> [INFO] You are bring rate limited.")
				time.sleep(result["retry_after"] / 1000)
			elif result["message"] == "Unknown Gift Code":
				print("======> [INFO] Unknown gift code: " + str(code))
				return
			else:
				print("======> [INFO] Found gift: " + str(code))
				return
		else:
			print("======> [ERROR] Failed to find 'message' for code: " + str(code))
			return


while True:
	code = ("".join(random.choice(string.ascii_letters + string.digits) for _ in range(16)))
	check_code(code, proxies)
	time.sleep(10)
