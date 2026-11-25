"""
Project: SDC260 5.5 Project - Grand Opening (Ndop & Co. online store)
Author: Rodrigue Sifor OUAMBO V MBOLIYOU (Student ID: OU26049981)
Date: November 24, 2026 (last updated)
Purpose: Cross-browser smoke test. Serves the site from a local server and runs
         the main shopping flow in Chrome, Firefox, and WebKit (Safari's engine)
         with Playwright: every page loads without script errors, Add to Cart
         updates the header count, the cart survives a refresh, checkout places an
         order, and the Network Connection Test page recognizes the local network.

Run from the project folder:
    pip install playwright && python -m playwright install firefox webkit
    python tests/cross-browser-test.py
"""
import functools, http.server, pathlib, socketserver, threading
from playwright.sync_api import sync_playwright

SITE = pathlib.Path(__file__).resolve().parent.parent
PORT = 5500
BASE = f"http://127.0.0.1:{PORT}/"
PAGES = ["index.html", "shop.html", "product.html?id=NDP-1001", "about.html", "contact.html",
         "cart.html", "checkout.html", "confirmation.html", "network.html", "404.html"]
CHECKOUT = {"ship-name": "Rodrigue Ouambo", "ship-street": "5555 Greenwich Rd", "ship-city": "Virginia Beach",
            "ship-state": "VA", "ship-zip": "23462", "ship-phone": "757-555-0142", "card-name": "Rodrigue Ouambo",
            "card-number": "4242 4242 4242 4242", "card-exp": "08/28", "card-cvc": "123"}


class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass


def start_server():
    handler = functools.partial(QuietHandler, directory=str(SITE))
    socketserver.TCPServer.allow_reuse_address = True
    server = socketserver.ThreadingTCPServer(("127.0.0.1", PORT), handler)
    threading.Thread(target=server.serve_forever, daemon=True).start()
    return server


def run_flow(browser):
    """Return a list of (check, passed) for one browser."""
    page = browser.new_context(viewport={"width": 1280, "height": 800}).new_page()
    errors = []
    page.on("pageerror", lambda e: errors.append(str(e)))
    page.on("dialog", lambda d: d.accept())
    results = []

    for url in PAGES:
        page.goto(BASE + url)
    results.append(("10 pages load with no script errors", not errors))

    page.goto(BASE + "shop.html")
    page.locator(".add-to-cart").nth(0).click()
    page.locator(".add-to-cart").nth(1).click()
    header = page.locator('.nav-list a[href="cart.html"]').inner_text()
    results.append(("Add to Cart updates the header count", header == "Cart (2)"))

    page.goto(BASE + "cart.html")
    page.reload()
    rows = page.locator("#cart-body tr").count()
    results.append(("Cart is kept in localStorage after a refresh", rows == 2))

    page.click("#checkout-link")
    page.wait_for_url("**/checkout.html")
    for field, value in CHECKOUT.items():
        page.fill("#" + field, value)
    page.click("#purchase-form button[type=submit]")
    page.wait_for_url("**/confirmation.html", timeout=8000)
    results.append(("Checkout places an order and opens the confirmation",
                    "Order" in page.locator("#confirm-details").inner_text()))

    page.goto(BASE + "network.html")
    results.append(("Network Test recognizes the local network",
                    page.inner_text("#network-title") == "Local network recognized"
                    and page.inner_text("#port-number") == str(PORT)))
    page.reload()
    results.append(("Last Time Launched is read back from the cookie",
                    page.inner_text("#last-launch").startswith(("Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"))))
    page.context.close()
    return results


def main():
    server = start_server()
    total = passed = 0
    with sync_playwright() as p:
        engines = [("Chrome", lambda: p.chromium.launch(channel="chrome")),
                   ("Firefox", p.firefox.launch),
                   ("WebKit (Safari engine)", p.webkit.launch)]
        for name, launch in engines:
            browser = launch()
            print(f"\n{name} {browser.version}")
            for check, ok in run_flow(browser):
                total += 1
                passed += ok
                print(f"  [{'PASS' if ok else 'FAIL'}] {check}")
            browser.close()
    server.shutdown()
    print(f"\n{passed} of {total} checks passed")


if __name__ == "__main__":
    main()
