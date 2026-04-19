from django.db import models
from accounts.models import GameTrackerUser
from django.core.validators import MinValueValidator, MaxValueValidator
import datetime


CONSOLES = (
    ('ps5', 'Playstation 5'),
    ('ps4', 'Playstation 4'),
    ('ps3', 'Playstation 3'),
    ('ps2', 'Playstation 2'),
    ('ps1', 'Playstation 1'),
    ('xsx', 'Xbox Series X'),
    ('xss', 'Xbox Series S'),
    ('xb1', 'Xbox One'),
    ('xb360', 'Xbox 360'),
    ('xb', 'Xbox'),
    ('ns2', 'Switch 2'),
    ('nsw', 'Switch'),
    ('wiiu', 'Wii U'),
    ('wii', 'Wii'),
    ('gcn', 'GameCube'),
    ('n64', 'Nintendo 64'),
    ('snes', 'SNES'),
    ('nes', 'NES'),
    ('pc', 'PC'),
    ('other', 'Other'),
)

GAME_GENRES = (
    ('action', 'Action'),
    ('action-adventure', 'Action-Adventure'),
    ('adventure', 'Adventure'),
    ('horror', 'Horror'),
    ('party', 'Party'),
    ('platformer', 'Platformer'),
    ('puzzle', 'Puzzle'),
    ('rpg', 'RPG'),
    ('shooter', 'Shooter'),
    ('simulation', 'Simulation'),
    ('sports/racing', 'Sports/Racing'),
    ('strategy', 'Strategy'),
    ('other', 'Other'),
)

# Create your models here.
class Game(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=50)
    console = models.CharField(max_length=30, choices=CONSOLES)
    release_year = models.PositiveIntegerField(
        validators=[
            MinValueValidator(1950),
            MaxValueValidator(datetime.date.today().year)
        ],
        blank=True,
        null=True
    )
    genre = models.CharField(max_length=30, choices=GAME_GENRES)
    description = models.CharField(max_length=200)
    owner = models.ForeignKey('accounts.GameTrackerUser', on_delete=models.CASCADE)
    box_art = models.ImageField(upload_to='game_pics/', blank=True, null=True) 

    def __str__(self) -> str:
        return self.title + " - " + self.console
