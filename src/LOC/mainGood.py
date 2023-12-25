from machine import Pin, ADC, PWM, I2C
from ssd1306 import SSD1306_I2C
import utime
import network
import socket
import ntptime
import urequests as requests
import ujson

# OLED display settings
WIDTH = 128
HEIGHT = 32  # Adjust the height if your display is 32 pixels in height
i2c = I2C(0, scl=Pin(13), sda=Pin(12), freq=400000)
# oled = SSD1306_I2C(WIDTH, HEIGHT, i2c)

# RGB LED pins initialization
R_LED = PWM(Pin(17), freq=5000)
G_LED = PWM(Pin(18), freq=5000)
B_LED = PWM(Pin(19), freq=5000)

# Wi-Fi credentials
# WIFI_SSID = 'motorola'
# WIFI_PASSWORD = '7654321098'
WIFI_SSID = 'FRITZ! Boz 7583'
WIFI_PASSWORD = '92633899054755599528'

# Connect to Wi-Fi
def connect_wifi(ssid, password):
    wlan = network.WLAN(network.STA_IF)
    wlan.active(True)
    if not wlan.isconnected():
        print('Connecting to network...')
        wlan.connect(ssid, password)
        while not wlan.isconnected():
            pass
    print('Network config:', wlan.ifconfig())
    return wlan

# Initialize Wi-Fi connection
wlan = connect_wifi(WIFI_SSID, WIFI_PASSWORD)

# Optional: Check internet connectivity
def check_internet(host="8.8.8.8", port=53, timeout=3):
    try:
        s = socket.socket()
        s.settimeout(timeout)
        s.connect((host, port))
        s.close()
        return True
    except OSError:
        return False

if check_internet():
    print("Connected to the Internet")
    try:
        ntptime.settime()  # Synchronize time with NTP server
        print("Time synchronized with NTP server")
    except:
        print("Failed to synchronize time")
else:
    print("No Internet connection")

# Function to set the color of the LED
def set_color(r, g, b):
    # Invert the 8-bit color values before converting to 16-bit duty cycle values
    R_LED.duty_u16(65535 - int(r / 255 * 65535))
    G_LED.duty_u16(65535 - int(g / 255 * 65535))
    B_LED.duty_u16(65535 - int(b / 255 * 65535))

# ADC settings for the potentiometer
adcpin = 26
pot = ADC(Pin(adcpin))

last_value = -1  # Initialize with a value that potentiometer will never have

def read_pot():
    adc_value = pot.read_u16()
    print(adc_value)
    scaled_value = int((1000 / 65535) * adc_value)
    return scaled_value

def log_value(value):
    with open('log.txt', 'a') as f:
        # Get current time in a human-readable format
        year, month, day, hour, minute, second, _, _ = utime.localtime()
        timestamp = "{:04d}-{:02d}-{:02d} {:02d}:{:02d}:{:02d}".format(year, month, day, hour, minute, second)
        f.write('{}\t {}\n'.format(timestamp, value))

def map_value_to_color(value):
    # Define color mappings based on the consciousness scale
    # The colors are just examples, adjust them as you see fit
    if value >= 700:  # Enlightenment
        set_color(255, 255, 255)  # White
    elif value >= 600:
        set_color(128, 0, 128)  # Purple
    elif value >= 400:  # Joy
        set_color(0, 0, 255)  # Blue
    elif value >= 250:
        set_color(0, 255, 0)  # Green
    elif value >= 150:
        set_color(255, 255, 0)  # Yellow
    elif value >= 75:
        set_color(204, 85, 0)  # Burnt Orange
    else:
        set_color(255, 0, 0)  # Red for lower levels

def update_display(value):
    oled.fill(0)  # Clear the display
    oled.text('Value: {}'.format(value), 0, 0)  # Display the value
    oled.show()  # Update the display

last_request_time = 0  # Initialize the last request time

while True:
    scaled_value = read_pot()
    if abs(scaled_value - last_value) >= 6:  # Check if the change is at least ±6
        # log_value(scaled_value)  # Log the new value with a timestamp
        map_value_to_color(scaled_value)
        # update_display(scaled_value)
        last_value = scaled_value  # Update the last known value only if a significant change occurred

        current_time = utime.time()  # Get the current time
        if current_time - last_request_time >= 1:  # Check if at least one second has passed
            request_url = "https://server-e4273.web.app/receiveNumber"
            post_data = ujson.dumps({'number': scaled_value})
            res = requests.post(request_url, headers={'content-type': 'application/json'}, data=post_data)
            last_request_time = current_time  # Update the last request time
