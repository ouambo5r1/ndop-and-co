/*
    Project: SDC260 5.5 Project - Grand Opening (Ndop & Co. online store)
    Author: Rodrigue Sifor OUAMBO V MBOLIYOU (Student ID: OU26049981)
    Date: November 24, 2026 (last updated)
    Purpose: Network Connection Test page. Reads window.location to show the
             Local Host Name, Current Communication Port, and Current Transmission
             Protocol, decides whether the site is on a local development server,
             the public web, or opened as a file, and keeps the Last Time Launched
             in a cookie (ndopLastLaunch). It also watches the browser's online and
             offline events.
*/

/* ===== Cookie helpers ===== */
const LAUNCH_COOKIE = "ndopLastLaunch";

function setLaunchCookie(value, days) {
    const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
    // Secure is added on HTTPS (GitHub Pages); local http://127.0.0.1 cannot use it
    const secure = location.protocol === "https:" ? ";Secure" : "";
    document.cookie = `${LAUNCH_COOKIE}=${encodeURIComponent(value)};expires=${expires};path=/;SameSite=Lax${secure}`;
}

function getLaunchCookie() {
    const match = document.cookie
        .split(";")
        .map(part => part.trim())
        .find(part => part.startsWith(LAUNCH_COOKIE + "="));
    return match ? decodeURIComponent(match.substring(LAUNCH_COOKIE.length + 1)) : "";
}

function clearLaunchCookie() {
    document.cookie = `${LAUNCH_COOKIE}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
}

/* ===== Where is the site running? ===== */
// Local development servers (VS Code Live Preview, Live Server, XAMPP) use
// localhost or a loopback address. Private network addresses also count as local.
function detectEnvironment() {
    const host = location.hostname;
    const isLoopback = host === "localhost" || host === "127.0.0.1" || host === "[::1]";
    const isPrivate = /^(10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.)/.test(host);

    if (location.protocol === "file:") {
        return "file";
    }
    if (isLoopback || isPrivate) {
        return "local";
    }
    return "public";
}

const BANNERS = {
    local: {
        title: "Local network recognized",
        message: "The store is running on a local development server on this computer. Only this machine can reach it.",
        className: "is-local"
    },
    public: {
        title: "Live on the public web",
        message: "The store is being served by a public web host, so anyone with the address can open it.",
        className: "is-public"
    },
    file: {
        title: "No network: opened as a file",
        message: "The page was opened straight from the folder. Start a local server (such as VS Code Live Preview) to test the network features.",
        className: "is-file"
    }
};

/* ===== Fill in the page ===== */
const environment = detectEnvironment();
const banner = document.getElementById("network-banner");
const protocol = location.protocol.replace(":", "").toUpperCase();
const defaultPorts = { HTTP: "80", HTTPS: "443" };

banner.classList.add(BANNERS[environment].className);
document.getElementById("network-title").textContent = BANNERS[environment].title;
document.getElementById("network-message").textContent = BANNERS[environment].message;

document.getElementById("host-name").textContent = location.hostname || "None (no server)";
document.getElementById("port-number").textContent = location.port
    ? location.port
    : (defaultPorts[protocol] ? `${defaultPorts[protocol]} (default for ${protocol})` : "None (no server)");
document.getElementById("protocol-name").textContent = protocol;

// Read the previous launch first, then save this one
const previousLaunch = getLaunchCookie();
const thisLaunch = new Date().toLocaleString("en-US", { dateStyle: "full", timeStyle: "medium" });
document.getElementById("last-launch").textContent = previousLaunch || "No earlier launch recorded on this browser.";

if (environment === "file") {
    document.getElementById("this-launch").textContent = "Not saved (cookies need a server).";
} else {
    setLaunchCookie(thisLaunch, 30);
    document.getElementById("this-launch").textContent = thisLaunch;
}

/* ===== Browser online / offline ===== */
const onlineEl = document.getElementById("browser-online");

function showOnlineState() {
    onlineEl.textContent = navigator.onLine
        ? "Online (the browser reports a network connection)"
        : "Offline (the browser reports no network connection)";
}

window.addEventListener("online", showOnlineState);
window.addEventListener("offline", showOnlineState);
showOnlineState();

/* ===== Buttons ===== */
document.getElementById("rerun-test").addEventListener("click", () => location.reload());

document.getElementById("clear-launch").addEventListener("click", () => {
    clearLaunchCookie();
    document.getElementById("last-launch").textContent = "Launch history cleared. Run the test again to start a new record.";
});
