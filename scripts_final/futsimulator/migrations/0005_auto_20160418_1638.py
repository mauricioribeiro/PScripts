# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-04-18 19:38
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('futsimulator', '0004_clube_escudo'),
    ]

    operations = [
        migrations.AlterField(
            model_name='clube',
            name='antepenultimo_jogo',
            field=models.IntegerField(choices=[(-1, 'Derrota'), (0, 'Empate'), (1, 'Vitória')], default=0),
        ),
        migrations.AlterField(
            model_name='clube',
            name='penultimo_jogo',
            field=models.IntegerField(choices=[(-1, 'Derrota'), (0, 'Empate'), (1, 'Vitória')], default=0),
        ),
        migrations.AlterField(
            model_name='clube',
            name='ultimo_jogo',
            field=models.IntegerField(choices=[(-1, 'Derrota'), (0, 'Empate'), (1, 'Vitória')], default=0),
        ),
    ]
