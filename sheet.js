$(document).ready(function(e) {
    $('.stat').bind('input', function() {
        updateMod($(this));
    })
    $("[name='proficiencybonus']").bind('input', function() {
        updateProfBonus();
    })
    $('.statmod').bind('change', function() {
        var name = $(this).attr('name')
        name = "uses" + name.slice(0, name.indexOf('mod'))

    })

    $("[name='classlevel']").bind('input', function() {
        var classes = $(this).val()
        var r = new RegExp(/\d+/g)
        var total = 0
        var result
        while ((result = r.exec(classes)) != null) {
            var lvl = parseInt(result)
            if (!isNaN(lvl))
                total += lvl
        }
        var prof = 2
        if (total > 0) {
            total -= 1
            prof += Math.trunc(total / 4)
            prof = "+" + prof
        } else {
            prof = ""
        }
        $("[name='proficiencybonus']").val(prof)
    })

    $("[name='totalhd']").bind('input', function() {
        $("[name='remaininghd']").val($(this).val())
    })

    function totalhd_clicked() {
        $("[name='remaininghd']").val($("[name='totalhd']").val())
    }

});

function autofill() {
    var url = window.location.pathname;
    var name = url.substring(url.lastIndexOf('/') + 1).split(".")[0];
    fill(name);
}

function fill(name) {
    var sheet = settings[name]["sheet"];
    var newTitle = settings[name]["title"];
    if (document.title != newTitle) {
        document.title = newTitle;
    }
    for (key in sheet["description"]) {
        var char = $("[name='" + key + "']");
        char.val(sheet["description"][key]);
    }

    for (key in sheet["chars"]) {
        var char = $("[name='" + key + "']");
        char.val(sheet["chars"][key]);
        updateMod(char);
    }
    $("[name='passiveperception']").val($("[name='Wisdommod']").val());



    $("[name='proficiencybonus']").val((sheet["proficiencybonus"] < 0 ? "" : "+") + sheet["proficiencybonus"]);
    for (var i = 0; i < sheet["skills"].length; i++) {
        var name = sheet["skills"][i];
        var skill = $("[name='" + name + "']");
        var label = $('label[for=' + name + ']').text();
        var char = label.split("(")[1].split(")")[0];
        $("[name='" + name + "-prof']").prop("checked", true);
        var charMod = 0;
        $(".statmod").each(function() {

            if ($(this).attr('name').startsWith(char)) {
                charMod = $(this).val();
                var value = parseInt($("[name='proficiencybonus']").val()) + parseInt(charMod);
                skill.val((value < 0 ? "" : "+") + value);
            }
        })
    }
    for (var i = 0; i < sheet["saving"].length; i++) {
        var name = sheet["saving"][i] + "-save";
        var saving = $("[name='" + name + "']");
        var label = $('label[for=' + name + ']').text();
        var char = sheet["saving"][i];
        $("[name='" + name + "-prof']").prop("checked", true);
        var charMod = 0;
        $(".statmod").each(function() {
            if ($(this).attr('name').startsWith(char)) {
                charMod = $(this).val();
                var value = parseInt($("[name='proficiencybonus']").val()) + parseInt(charMod);
                saving.val((value < 0 ? "" : "+") + value);
            }
        })
    }

    for (var i = 0; i < sheet["feats"].length; i++) {
        $("[name='features']").append(sheet["feats"][i] + "\n\n");
    }
    for (var i = 0; i < sheet["profs"].length; i++) {
        $("[name='otherprofs']").append(sheet["profs"][i] + "\n\n");
    }

    var atkIndex = 1;
    for (var i = 0; i < sheet["equipment"].length; i++) {
        var text = sheet["equipment"][i]["type"] + ": " + sheet["equipment"][i]["name"] + "\n"
        $("[name='equipmentList']").append(text);
        if (sheet["equipment"][i]["type"] == "rweapon") {
            $("[name='atkname" + atkIndex + "']").val(sheet["equipment"][i]["name"]);
            var bonus = parseInt($("[name='proficiencybonus']").val()) + parseInt($("[name='Dexteritymod']").val())
            var dmgBonus = parseInt($("[name='Dexteritymod']").val());
            if (sheet["equipment"][i]["bonus"]) {
                bonus += sheet["equipment"][i]["bonus"];
                dmgBonus += sheet["equipment"][i]["bonus"];
            }
            $("[name='atkbonus" + atkIndex + "']").val((bonus < 0 ? "" : "+") + bonus);
            $("[name='atkdamage" + atkIndex + "']").val(sheet["equipment"][i]["effect"] + (dmgBonus < 0 ? "" : "+") + dmgBonus);
            atkIndex += 1;

        } else if (sheet["equipment"][i]["type"] == "mweapon") {
            $("[name='atkname" + atkIndex + "']").val(sheet["equipment"][i]["name"]);
            var bonus = parseInt($("[name='proficiencybonus']").val()) + parseInt($("[name='Strengthmod']").val())

            var dmgBonus = parseInt($("[name='Strengthmod']").val());
            if (sheet["equipment"][i]["bonus"]) {
                bonus += sheet["equipment"][i]["bonus"];
                dmgBonus += sheet["equipment"][i]["bonus"];
            }
            $("[name='atkbonus" + atkIndex + "']").val((bonus < 0 ? "" : "+") + bonus);
            $("[name='atkdamage" + atkIndex + "']").val(sheet["equipment"][i]["effect"] + (dmgBonus < 0 ? "" : "+") + dmgBonus);
            atkIndex += 1;
        }
    }
    $("[name='maxhp']").val(sheet["hp"]);
    $("[name='ac']").val(sheet["ac"]);


    ac
}


function updateMod(char) {
    var inputName = char.attr('name')
    var mod = parseInt(char.val()) - 10

    if (mod % 2 == 0)
        mod = mod / 2
    else
        mod = (mod - 1) / 2

    if (isNaN(mod))
        mod = ""
    else if (mod >= 0)
        mod = "+" + mod

    var scoreName = inputName.slice(0, inputName.indexOf("score"))
    var modName = scoreName + "mod"

    $("[name='" + modName + "']").val(mod)
}





var settings = {
    "andrea": {
        "title": "Andrea",
        "sheet": {
            "description": {
                "charname": "Andrea",
                "classlevel": "Fighter 6",
                "race": "Human",
                "alignment": "neutral good",
                "background": "Outlander",
                "experiencepoints": 15000
            },
            "chars": {
                "Strengthscore": 16,
                "Dexterityscore": 11,
                "Constitutionscore": 12,
                "Intelligencescore": 16,
                "Wisdomscore": 10,
                "Charismascore": 10
            },
            "skills": ["Athletics", "Insight", "Survival", "Perception", "History", "Religion", "Investigation", "Persuasion"],
            "saving": ["Strength", "Constitution"],
            "feats": ["Martial Adept", "Skilled", "Observant"],
            "profs": ["Trip Attack", "Pushing Attack", "Distracting Attack", "Disarming attack", "Sweeping Attack", "Evasive Footwork"],
            "proficiencybonus": 3,
            "hp": 52,
            "ac": 20,
            "equipment": [{ "name": "Long Sword", "type": "mweapon", "effect": "Cut 1d8", "bonus": 0 }, { "name": "SG Shield", "type": "shield", "effect": 2 }, { "name": "Splint Armor", "type": "armor", "effect": 7, "maxDex": 0 }]
        }
    },
    "lisa": {
        "title": "Lisa",
        "sheet": {
            "description": {
                "charname": "Lisa",
                "classlevel": "Barbarian 6",
                "race": "Half-Orc",
                "alignment": "chaotic good",
                "background": "Outlander",
                "experiencepoints": 15000
            },
            "chars": {
                "Strengthscore": 18,
                "Dexterityscore": 13,
                "Constitutionscore": 16,
                "Intelligencescore": 8,
                "Wisdomscore": 12,
                "Charismascore": 10
            },
            "skills": ["Athletics", "Intimidation", "Survival", "Perception"],
            "saving": ["Strength", "Constitution"],
            "feats": ["Danger Sense, Fast Movement, Rage, Reckless Attack, Unarmored Defense"],
            "profs": ["Trip Attack", "Pushing Attack", "Distracting Attack", "Disarming attack", "Sweeping Attack", "Evasive Footwork"],
            "proficiencybonus": 3,
            "hp": 65,
            "ac": 14,
            "equipment": [{ "name": "SJA Great Sword", "type": "mweapon", "effect": "Slash 2d6", "bonus": 1 }, { "name": " Ring", "type": "ring", "effect": "" }]
        }
    },
    "marco": {
        "title": "Marco",
        "sheet": {
            "description": {
                "charname": "Marco",
                "classlevel": "Sorcerer 6",
                "race": "Dragonborn",
                "alignment": "neutral good",
                "background": "Outlander",
                "experiencepoints": 15000
            },
            "chars": {
                "Strengthscore": 10,
                "Dexterityscore": 14,
                "Constitutionscore": 14,
                "Intelligencescore": 10,
                "Wisdomscore": 12,
                "Charismascore": 17
            },
            "skills": ["Athletics", "Arcana", "Intimidation", "Survival"],
            "saving": ["Charisma", "Constitution"],
            "feats": ["Cold Resistance", "Cold Breath", "Dragon Ancestor", "Draconic Resilience", "Elemental Affinity: Cold", "Dragon Ancestor", "Font of Magic"],
            "profs": ["Spellcasting: DC 14, Atk: +7",
                "Cantrips: blade ward, mage hand, ray of frost, shocking grasp, true strike",
                "1st level (4 slots): chromatic orb, magic missile, shield",
                "2nd level (3 slots): blur, scorching ray",
                "3rd level (3 slots): Fireball, fly"
            ],
            "proficiencybonus": 3,
            "hp": 44,
            "ac": 15,
            "equipment": [{ "name": "گاسپاره Staff", "type": "mweapon", "effect": "Bludge 1d8", "bonus": 1 }, { "name": "Dagger", "type": "mweapon", "effect": "Pierce 1d4", "bonus": 0 }]
        }
    },
    "mirko": {
        "title": "Mirko",
        "sheet": {
            "description": {
                "charname": "Mirko",
                "classlevel": "Druid 6",
                "race": "Human",
                "alignment": "neutral good",
                "background": "Folk Hero",
                "experiencepoints": 15000
            },
            "chars": {
                "Strengthscore": 9,
                "Dexterityscore": 16,
                "Constitutionscore": 14,
                "Intelligencescore": 11,
                "Wisdomscore": 16,
                "Charismascore": 14
            },
            "skills": ["History", "Insight", "Medicine", "Nature"],
            "saving": ["Intelligence", "Wisdom"],
            "feats": ["Druidic", "Wild Shape", "Combat Wild Shape", "Primal Strike", "Two-Weapon Fighting"],
            "profs": ["Spellcasting: DC 14, Atk: +6",
                "Cantrips: druidcraft, produce flame, thorn whip",
                "1st Level (4 slots): cure wounds, faerie fire, fog cloud, healing word, thunderwave",
                "2nd Level (3 slots): flame blade, gust of wind, moonbeam",
                "3rd Level (3 slots): call lightning"
            ],
            "proficiencybonus": 3,
            "hp": 45,
            "ac": 16,
            "equipment": [{ "name": "Dagger", "type": "mweapon", "effect": "Cut 1d4", "bonus": 0 }, { "name": "F Rope Belt", "type": "belt", "effect": "Beast Control" }]
        }
    },
};