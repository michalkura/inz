"""Welcome to Reflex!."""

from inzynierka import styles

# Import all the pages.
from inzynierka.pages import *

import reflex as rx

# Create the app and compile it.
app = rx.App(style=styles.base_style)
