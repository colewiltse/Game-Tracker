from django.db import models
from accounts.models import GameTrackerUser


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

# Create your models here.
class Game(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=50)
    console = models.CharField(max_length=30, choices=CONSOLES)
    description = models.CharField(max_length=200)
    owner = models.ForeignKey('accounts.GameTrackerUser', on_delete=models.CASCADE)
    box_art = models.ImageField(upload_to='game_pics/', blank=True, null=True) 

    def __str__(self) -> str:
        return self.title + " - " + self.console
