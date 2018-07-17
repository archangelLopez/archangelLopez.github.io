$(document).ready(function(e) {
    $('.stat').bind('input', function() {
        updateMod($(this));
    })
    console.log($("[name='proficiencybonus']"));
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
    $("[name='maxhp']").val(sheet["hp"]);
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
                "background": "outlander",
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
            "equipment": {}
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
                "background": "outlander",
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
            "equipment": {}
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
                "background": "outlander",
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
            "equipment": {}
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
                "background": "outlander",
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
            "equipment": {}
        }
    },
};