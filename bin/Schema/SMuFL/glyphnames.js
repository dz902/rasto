"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const glyphNames = {
    "4stringTabClef": {
        "codepoint": "U+E06E",
        "description": "4-string tab clef"
    },
    "6stringTabClef": {
        "codepoint": "U+E06D",
        "description": "6-string tab clef"
    },
    "accSagittal11LargeDiesisDown": {
        "codepoint": "U+E30D",
        "description": "11 large diesis down, 3\u00b0 down [46 EDO]"
    },
    "accSagittal11LargeDiesisUp": {
        "codepoint": "U+E30C",
        "description": "11 large diesis up, (11L), (sharp less 11M), 3\u00b0 up [46 EDO]"
    },
    "accSagittal11MediumDiesisDown": {
        "codepoint": "U+E30B",
        "description": "11 medium diesis down, 1\u00b0[17 31] 2\u00b046 down, 1/4-tone down"
    },
    "accSagittal11MediumDiesisUp": {
        "codepoint": "U+E30A",
        "description": "11 medium diesis up, (11M), 1\u00b0[17 31] 2\u00b046 up, 1/4-tone up"
    },
    "accSagittal11v19LargeDiesisDown": {
        "codepoint": "U+E3AB",
        "description": "11:19 large diesis down"
    },
    "accSagittal11v19LargeDiesisUp": {
        "codepoint": "U+E3AA",
        "description": "11:19 large diesis up, (11:19L, apotome less 11:19M)"
    },
    "accSagittal11v19MediumDiesisDown": {
        "codepoint": "U+E3A3",
        "description": "11:19 medium diesis down"
    },
    "accSagittal11v19MediumDiesisUp": {
        "codepoint": "U+E3A2",
        "description": "11:19 medium diesis up, (11:19M, 11M plus 19s)"
    },
    "accSagittal11v49CommaDown": {
        "codepoint": "U+E397",
        "description": "11:49 comma down"
    },
    "accSagittal11v49CommaUp": {
        "codepoint": "U+E396",
        "description": "11:49 comma up, (11:49C, 11M less 49C)"
    },
    "accSagittal143CommaDown": {
        "codepoint": "U+E395",
        "description": "143 comma down"
    },
    "accSagittal143CommaUp": {
        "codepoint": "U+E394",
        "description": "143 comma up, (143C, 13L less 11M)"
    },
    "accSagittal17CommaDown": {
        "codepoint": "U+E343",
        "description": "17 comma down"
    },
    "accSagittal17CommaUp": {
        "codepoint": "U+E342",
        "description": "17 comma up, (17C)"
    },
    "accSagittal17KleismaDown": {
        "codepoint": "U+E393",
        "description": "17 kleisma down"
    },
    "accSagittal17KleismaUp": {
        "codepoint": "U+E392",
        "description": "17 kleisma up, (17k)"
    },
    "accSagittal19CommaDown": {
        "codepoint": "U+E399",
        "description": "19 comma down"
    },
    "accSagittal19CommaUp": {
        "codepoint": "U+E398",
        "description": "19 comma up, (19C)"
    },
    "accSagittal19SchismaDown": {
        "codepoint": "U+E391",
        "description": "19 schisma down"
    },
    "accSagittal19SchismaUp": {
        "codepoint": "U+E390",
        "description": "19 schisma up, (19s)"
    },
    "accSagittal23CommaDown": {
        "codepoint": "U+E371",
        "description": "23 comma down, 2\u00b0 down [96 EDO], 1/8-tone down"
    },
    "accSagittal23CommaUp": {
        "codepoint": "U+E370",
        "description": "23 comma up, (23C), 2\u00b0 up [96 EDO], 1/8-tone up"
    },
    "accSagittal23SmallDiesisDown": {
        "codepoint": "U+E39F",
        "description": "23 small diesis down"
    },
    "accSagittal23SmallDiesisUp": {
        "codepoint": "U+E39E",
        "description": "23 small diesis up, (23S)"
    },
    "accSagittal25SmallDiesisDown": {
        "codepoint": "U+E307",
        "description": "25 small diesis down, 2\u00b0 down [53 EDO]"
    },
    "accSagittal25SmallDiesisUp": {
        "codepoint": "U+E306",
        "description": "25 small diesis up, (25S, ~5:13S, ~37S, 5C\u00a0plus\u00a05C), 2\u00b0 up [53 EDO]"
    },
    "accSagittal35LargeDiesisDown": {
        "codepoint": "U+E30F",
        "description": "35 large diesis down, 2\u00b0 down [50 EDO], 5/18-tone down"
    },
    "accSagittal35LargeDiesisUp": {
        "codepoint": "U+E30E",
        "description": "35 large diesis up, (35L, ~13L, ~125L,  sharp less 35M), 2\u00b050 up"
    },
    "accSagittal35MediumDiesisDown": {
        "codepoint": "U+E309",
        "description": "35 medium diesis down, 1\u00b0[50] 2\u00b0[27] down, 2/9-tone down"
    },
    "accSagittal35MediumDiesisUp": {
        "codepoint": "U+E308",
        "description": "35 medium diesis up, (35M, ~13M, ~125M, 5C\u00a0plus\u00a07C), 2/9-tone up"
    },
    "accSagittal49LargeDiesisDown": {
        "codepoint": "U+E3A9",
        "description": "49 large diesis down"
    },
    "accSagittal49LargeDiesisUp": {
        "codepoint": "U+E3A8",
        "description": "49 large diesis up, (49L, ~31L, apotome less 49M)"
    },
    "accSagittal49MediumDiesisDown": {
        "codepoint": "U+E3A5",
        "description": "49 medium diesis down"
    },
    "accSagittal49MediumDiesisUp": {
        "codepoint": "U+E3A4",
        "description": "49 medium diesis up, (49M, ~31M, 7C plus 7C)"
    },
    "accSagittal49SmallDiesisDown": {
        "codepoint": "U+E39D",
        "description": "49 small diesis down"
    },
    "accSagittal49SmallDiesisUp": {
        "codepoint": "U+E39C",
        "description": "49 small diesis up, (49S, ~31S)"
    },
    "accSagittal55CommaDown": {
        "codepoint": "U+E345",
        "description": "55 comma down, 3\u00b0 down [96 EDO], 3/16-tone down"
    },
    "accSagittal55CommaUp": {
        "codepoint": "U+E344",
        "description": "55 comma up, (55C, 11M less 5C), 3\u00b0up [96 EDO], 3/16-tone up"
    },
    "accSagittal5CommaDown": {
        "codepoint": "U+E303",
        "description": "5 comma down, 1\u00b0 down [22 27 29 34 41 46 53 96 EDOs], 1/12-tone down"
    },
    "accSagittal5CommaUp": {
        "codepoint": "U+E302",
        "description": "5 comma up, (5C), 1\u00b0 up [22 27 29 34 41 46 53 96 EDOs], 1/12-tone up"
    },
    "accSagittal5v11SmallDiesisDown": {
        "codepoint": "U+E349",
        "description": "5:11 small diesis down"
    },
    "accSagittal5v11SmallDiesisUp": {
        "codepoint": "U+E348",
        "description": "5:11 small diesis up, (5:11S, ~7:13S, ~11:17S, 5:7k plus 7:11C)"
    },
    "accSagittal5v13LargeDiesisDown": {
        "codepoint": "U+E3AD",
        "description": "5:13 large diesis down"
    },
    "accSagittal5v13LargeDiesisUp": {
        "codepoint": "U+E3AC",
        "description": "5:13 large diesis up, (5:13L, ~37L, apotome less 5:13M)"
    },
    "accSagittal5v13MediumDiesisDown": {
        "codepoint": "U+E3A1",
        "description": "5:13 medium diesis down"
    },
    "accSagittal5v13MediumDiesisUp": {
        "codepoint": "U+E3A0",
        "description": "5:13 medium diesis up, (5:13M, ~37M, 5C plus 13C)"
    },
    "accSagittal5v19CommaDown": {
        "codepoint": "U+E373",
        "description": "5:19 comma down, 1/20-tone down"
    },
    "accSagittal5v19CommaUp": {
        "codepoint": "U+E372",
        "description": "5:19 comma up, (5:19C, 5C plus 19s), 1/20-tone up"
    },
    "accSagittal5v23SmallDiesisDown": {
        "codepoint": "U+E375",
        "description": "5:23 small diesis down, 2\u00b0 down [60 EDO], 1/5-tone down"
    },
    "accSagittal5v23SmallDiesisUp": {
        "codepoint": "U+E374",
        "description": "5:23 small diesis up, (5:23S, 5C plus 23C), 2\u00b0 up [60 EDO], 1/5-tone up"
    },
    "accSagittal5v49MediumDiesisDown": {
        "codepoint": "U+E3A7",
        "description": "5:49 medium diesis down"
    },
    "accSagittal5v49MediumDiesisUp": {
        "codepoint": "U+E3A6",
        "description": "5:49 medium diesis up, (5:49M, half apotome)"
    },
    "accSagittal5v7KleismaDown": {
        "codepoint": "U+E301",
        "description": "5:7 kleisma down"
    },
    "accSagittal5v7KleismaUp": {
        "codepoint": "U+E300",
        "description": "5:7 kleisma up, (5:7k, ~11:13k, 7C\u00a0less\u00a05C)"
    },
    "accSagittal7CommaDown": {
        "codepoint": "U+E305",
        "description": "7 comma down, 1\u00b0 down [43 EDO], 2\u00b0 down [72 EDO], 1/6-tone down"
    },
    "accSagittal7CommaUp": {
        "codepoint": "U+E304",
        "description": "7 comma up, (7C), 1\u00b0 up [43 EDO], 2\u00b0 up [72 EDO], 1/6-tone up"
    },
    "accSagittal7v11CommaDown": {
        "codepoint": "U+E347",
        "description": "7:11 comma down, 1\u00b0 down [60 EDO], 1/10-tone down"
    },
    "accSagittal7v11CommaUp": {
        "codepoint": "U+E346",
        "description": "7:11 comma up, (7:11C, ~13:17S, ~29S, 11L less 7C), 1\u00b0 up [60 EDO]"
    },
    "accSagittal7v11KleismaDown": {
        "codepoint": "U+E341",
        "description": "7:11 kleisma down"
    },
    "accSagittal7v11KleismaUp": {
        "codepoint": "U+E340",
        "description": "7:11 kleisma up, (7:11k, ~29k)"
    },
    "accSagittal7v19CommaDown": {
        "codepoint": "U+E39B",
        "description": "7:19 comma down"
    },
    "accSagittal7v19CommaUp": {
        "codepoint": "U+E39A",
        "description": "7:19 comma up, (7:19C, 7C less 19s)"
    },
    "accSagittalAcute": {
        "codepoint": "U+E3F2",
        "description": "Acute, 5 schisma up (5s), 2 cents up"
    },
    "accSagittalDoubleFlat": {
        "codepoint": "U+E335",
        "description": "Double flat, (2 apotomes down)[almost all EDOs], whole-tone down"
    },
    "accSagittalDoubleFlat11v49CUp": {
        "codepoint": "U+E3E9",
        "description": "Double flat 11:49C-up"
    },
    "accSagittalDoubleFlat143CUp": {
        "codepoint": "U+E3EB",
        "description": "Double flat 143C-up"
    },
    "accSagittalDoubleFlat17CUp": {
        "codepoint": "U+E365",
        "description": "Double flat 17C-up"
    },
    "accSagittalDoubleFlat17kUp": {
        "codepoint": "U+E3ED",
        "description": "Double flat 17k-up"
    },
    "accSagittalDoubleFlat19CUp": {
        "codepoint": "U+E3E7",
        "description": "Double flat 19C-up"
    },
    "accSagittalDoubleFlat19sUp": {
        "codepoint": "U+E3EF",
        "description": "Double flat 19s-up"
    },
    "accSagittalDoubleFlat23CUp": {
        "codepoint": "U+E387",
        "description": "Double flat 23C-up, 14\u00b0 down [96 EDO], 7/8-tone down"
    },
    "accSagittalDoubleFlat23SUp": {
        "codepoint": "U+E3E1",
        "description": "Double flat 23S-up"
    },
    "accSagittalDoubleFlat25SUp": {
        "codepoint": "U+E32D",
        "description": "Double flat 25S-up, 8\u00b0down [53 EDO]"
    },
    "accSagittalDoubleFlat49SUp": {
        "codepoint": "U+E3E3",
        "description": "Double flat 49S-up"
    },
    "accSagittalDoubleFlat55CUp": {
        "codepoint": "U+E363",
        "description": "Double flat 55C-up, 13\u00b0 down [96 EDO], 13/16-tone down"
    },
    "accSagittalDoubleFlat5CUp": {
        "codepoint": "U+E331",
        "description": "Double flat 5C-up, 5\u00b0[22 29] 7\u00b0[34 41] 9\u00b053 down, 11/12 tone down"
    },
    "accSagittalDoubleFlat5v11SUp": {
        "codepoint": "U+E35F",
        "description": "Double flat 5:11S-up"
    },
    "accSagittalDoubleFlat5v19CUp": {
        "codepoint": "U+E385",
        "description": "Double flat 5:19C-up, 19/20-tone down"
    },
    "accSagittalDoubleFlat5v23SUp": {
        "codepoint": "U+E383",
        "description": "Double flat 5:23S-up, 8\u00b0 down  [60 EDO], 4/5-tone down"
    },
    "accSagittalDoubleFlat5v7kUp": {
        "codepoint": "U+E333",
        "description": "Double flat 5:7k-up"
    },
    "accSagittalDoubleFlat7CUp": {
        "codepoint": "U+E32F",
        "description": "Double flat 7C-up, 5\u00b0 down [43 EDO], 10\u00b0 down [72 EDO], 5/6-tone down"
    },
    "accSagittalDoubleFlat7v11CUp": {
        "codepoint": "U+E361",
        "description": "Double flat 7:11C-up, 9\u00b0 down [60 EDO], 9/10-tone down"
    },
    "accSagittalDoubleFlat7v11kUp": {
        "codepoint": "U+E367",
        "description": "Double flat 7:11k-up"
    },
    "accSagittalDoubleFlat7v19CUp": {
        "codepoint": "U+E3E5",
        "description": "Double flat 7:19C-up"
    },
    "accSagittalDoubleSharp": {
        "codepoint": "U+E334",
        "description": "Double sharp, (2 apotomes up)[almost all EDOs], whole-tone up"
    },
    "accSagittalDoubleSharp11v49CDown": {
        "codepoint": "U+E3E8",
        "description": "Double sharp 11:49C-down"
    },
    "accSagittalDoubleSharp143CDown": {
        "codepoint": "U+E3EA",
        "description": "Double sharp 143C-down"
    },
    "accSagittalDoubleSharp17CDown": {
        "codepoint": "U+E364",
        "description": "Double sharp 17C-down"
    },
    "accSagittalDoubleSharp17kDown": {
        "codepoint": "U+E3EC",
        "description": "Double sharp 17k-down"
    },
    "accSagittalDoubleSharp19CDown": {
        "codepoint": "U+E3E6",
        "description": "Double sharp 19C-down"
    },
    "accSagittalDoubleSharp19sDown": {
        "codepoint": "U+E3EE",
        "description": "Double sharp 19s-down"
    },
    "accSagittalDoubleSharp23CDown": {
        "codepoint": "U+E386",
        "description": "Double sharp 23C-down, 14\u00b0up [96 EDO], 7/8-tone up"
    },
    "accSagittalDoubleSharp23SDown": {
        "codepoint": "U+E3E0",
        "description": "Double sharp 23S-down"
    },
    "accSagittalDoubleSharp25SDown": {
        "codepoint": "U+E32C",
        "description": "Double sharp 25S-down, 8\u00b0up [53 EDO]"
    },
    "accSagittalDoubleSharp49SDown": {
        "codepoint": "U+E3E2",
        "description": "Double sharp 49S-down"
    },
    "accSagittalDoubleSharp55CDown": {
        "codepoint": "U+E362",
        "description": "Double sharp 55C-down, 13\u00b0 up [96 EDO], 13/16-tone up"
    },
    "accSagittalDoubleSharp5CDown": {
        "codepoint": "U+E330",
        "description": "Double sharp 5C-down, 5\u00b0[22 29] 7\u00b0[34 41] 9\u00b053 up, 11/12 tone up"
    },
    "accSagittalDoubleSharp5v11SDown": {
        "codepoint": "U+E35E",
        "description": "Double sharp 5:11S-down"
    },
    "accSagittalDoubleSharp5v19CDown": {
        "codepoint": "U+E384",
        "description": "Double sharp 5:19C-down, 19/20-tone up"
    },
    "accSagittalDoubleSharp5v23SDown": {
        "codepoint": "U+E382",
        "description": "Double sharp 5:23S-down, 8\u00b0 up [60 EDO], 4/5-tone up"
    },
    "accSagittalDoubleSharp5v7kDown": {
        "codepoint": "U+E332",
        "description": "Double sharp 5:7k-down"
    },
    "accSagittalDoubleSharp7CDown": {
        "codepoint": "U+E32E",
        "description": "Double sharp 7C-down, 5\u00b0[43] 10\u00b0[72] up, 5/6-tone up"
    },
    "accSagittalDoubleSharp7v11CDown": {
        "codepoint": "U+E360",
        "description": "Double sharp 7:11C-down, 9\u00b0 up [60 EDO], 9/10-tone up"
    },
    "accSagittalDoubleSharp7v11kDown": {
        "codepoint": "U+E366",
        "description": "Double sharp 7:11k-down"
    },
    "accSagittalDoubleSharp7v19CDown": {
        "codepoint": "U+E3E4",
        "description": "Double sharp 7:19C-down"
    },
    "accSagittalFlat": {
        "codepoint": "U+E319",
        "description": "Flat, (apotome down)[almost all EDOs], 1/2-tone down"
    },
    "accSagittalFlat11LDown": {
        "codepoint": "U+E329",
        "description": "Flat 11L-down, 8\u00b0 up [46 EDO]"
    },
    "accSagittalFlat11MDown": {
        "codepoint": "U+E327",
        "description": "Flat 11M-down, 3\u00b0 down [17 31 EDOs], 7\u00b0 down [46 EDO], 3/4-tone down"
    },
    "accSagittalFlat11v19LDown": {
        "codepoint": "U+E3DB",
        "description": "Flat 11:19L-down"
    },
    "accSagittalFlat11v19MDown": {
        "codepoint": "U+E3D3",
        "description": "Flat 11:19M-down"
    },
    "accSagittalFlat11v49CDown": {
        "codepoint": "U+E3C7",
        "description": "Flat 11:49C-down"
    },
    "accSagittalFlat11v49CUp": {
        "codepoint": "U+E3B9",
        "description": "Flat 11:49C-up"
    },
    "accSagittalFlat143CDown": {
        "codepoint": "U+E3C5",
        "description": "Flat 143C-down"
    },
    "accSagittalFlat143CUp": {
        "codepoint": "U+E3BB",
        "description": "Flat 143C-up"
    },
    "accSagittalFlat17CDown": {
        "codepoint": "U+E357",
        "description": "Flat 17C-down"
    },
    "accSagittalFlat17CUp": {
        "codepoint": "U+E351",
        "description": "Flat 17C-up"
    },
    "accSagittalFlat17kDown": {
        "codepoint": "U+E3C3",
        "description": "Flat 17k-down"
    },
    "accSagittalFlat17kUp": {
        "codepoint": "U+E3BD",
        "description": "Flat 17k-up"
    },
    "accSagittalFlat19CDown": {
        "codepoint": "U+E3C9",
        "description": "Flat 19C-down"
    },
    "accSagittalFlat19CUp": {
        "codepoint": "U+E3B7",
        "description": "Flat 19C-up"
    },
    "accSagittalFlat19sDown": {
        "codepoint": "U+E3C1",
        "description": "Flat 19s-down"
    },
    "accSagittalFlat19sUp": {
        "codepoint": "U+E3BF",
        "description": "Flat 19s-up"
    },
    "accSagittalFlat23CDown": {
        "codepoint": "U+E37D",
        "description": "Flat 23C-down, 10\u00b0 down [96 EDO], 5/8-tone down"
    },
    "accSagittalFlat23CUp": {
        "codepoint": "U+E37B",
        "description": "Flat 23C-up, 6\u00b0 down [96 EDO], 3/8-tone down"
    },
    "accSagittalFlat23SDown": {
        "codepoint": "U+E3CF",
        "description": "Flat 23S-down"
    },
    "accSagittalFlat23SUp": {
        "codepoint": "U+E3B1",
        "description": "Flat 23S-up"
    },
    "accSagittalFlat25SDown": {
        "codepoint": "U+E323",
        "description": "Flat 25S-down, 7\u00b0 down [53 EDO]"
    },
    "accSagittalFlat25SUp": {
        "codepoint": "U+E311",
        "description": "Flat 25S-up, 3\u00b0 down [53 EDO]"
    },
    "accSagittalFlat35LDown": {
        "codepoint": "U+E32B",
        "description": "Flat 35L-down, 5\u00b0 down [50 EDO]"
    },
    "accSagittalFlat35MDown": {
        "codepoint": "U+E325",
        "description": "Flat 35M-down, 4\u00b0 down [50 EDO], 6\u00b0 down [27 EDO], 13/18-tone down"
    },
    "accSagittalFlat49LDown": {
        "codepoint": "U+E3D9",
        "description": "Flat 49L-down"
    },
    "accSagittalFlat49MDown": {
        "codepoint": "U+E3D5",
        "description": "Flat 49M-down"
    },
    "accSagittalFlat49SDown": {
        "codepoint": "U+E3CD",
        "description": "Flat 49S-down"
    },
    "accSagittalFlat49SUp": {
        "codepoint": "U+E3B3",
        "description": "Flat 49S-up"
    },
    "accSagittalFlat55CDown": {
        "codepoint": "U+E359",
        "description": "Flat 55C-down, 11\u00b0 down [96 EDO], 11/16-tone down"
    },
    "accSagittalFlat55CUp": {
        "codepoint": "U+E34F",
        "description": "Flat 55C-up, 5\u00b0 down [96 EDO], 5/16-tone down"
    },
    "accSagittalFlat5CDown": {
        "codepoint": "U+E31F",
        "description": "Flat 5C-down, 4\u00b0[22 29] 5\u00b0[27 34 41] 6\u00b0[39 46 53] down, 7/12-tone down"
    },
    "accSagittalFlat5CUp": {
        "codepoint": "U+E315",
        "description": "Flat 5C-up, 2\u00b0[22,29] 3\u00b0[34 41] 4\u00b0[46 53 60] down, 5/12-tone down"
    },
    "accSagittalFlat5v11SDown": {
        "codepoint": "U+E35D",
        "description": "Flat 5:11S-down"
    },
    "accSagittalFlat5v11SUp": {
        "codepoint": "U+E34B",
        "description": "Flat 5:11S-up"
    },
    "accSagittalFlat5v13LDown": {
        "codepoint": "U+E3DD",
        "description": "Flat 5:13L-down"
    },
    "accSagittalFlat5v13MDown": {
        "codepoint": "U+E3D1",
        "description": "Flat 5:13M-down"
    },
    "accSagittalFlat5v19CDown": {
        "codepoint": "U+E37F",
        "description": "Flat 5:19C-down, 11/20-tone down"
    },
    "accSagittalFlat5v19CUp": {
        "codepoint": "U+E379",
        "description": "Flat 5:19C-up, 9/20-tone down"
    },
    "accSagittalFlat5v23SDown": {
        "codepoint": "U+E381",
        "description": "Flat 5:23S-down, 7\u00b0 down [60 EDO], 7/10-tone down"
    },
    "accSagittalFlat5v23SUp": {
        "codepoint": "U+E377",
        "description": "Flat 5:23S-up, 3\u00b0 down [60 EDO], 3/10-tone down"
    },
    "accSagittalFlat5v49MDown": {
        "codepoint": "U+E3D7",
        "description": "Flat 5:49M-down"
    },
    "accSagittalFlat5v7kDown": {
        "codepoint": "U+E31D",
        "description": "Flat 5:7k-down"
    },
    "accSagittalFlat5v7kUp": {
        "codepoint": "U+E317",
        "description": "Flat 5:7k-up"
    },
    "accSagittalFlat7CDown": {
        "codepoint": "U+E321",
        "description": "Flat 7C-down, 4\u00b0 down [43 EDO], 8\u00b0 down [72 EDO], 2/3-tone down"
    },
    "accSagittalFlat7CUp": {
        "codepoint": "U+E313",
        "description": "Flat 7C-up, 2\u00b0 down [43 EDO], 4\u00b0 down [72 EDO], 1/3-tone down"
    },
    "accSagittalFlat7v11CDown": {
        "codepoint": "U+E35B",
        "description": "Flat 7:11C-down, 6\u00b0 down [60 EDO], 3/5- tone down"
    },
    "accSagittalFlat7v11CUp": {
        "codepoint": "U+E34D",
        "description": "Flat 7:11C-up, 4\u00b0 down [60 EDO], 2/5-tone down"
    },
    "accSagittalFlat7v11kDown": {
        "codepoint": "U+E355",
        "description": "Flat 7:11k-down"
    },
    "accSagittalFlat7v11kUp": {
        "codepoint": "U+E353",
        "description": "Flat 7:11k-up"
    },
    "accSagittalFlat7v19CDown": {
        "codepoint": "U+E3CB",
        "description": "Flat 7:19C-down"
    },
    "accSagittalFlat7v19CUp": {
        "codepoint": "U+E3B5",
        "description": "Flat 7:19C-up"
    },
    "accSagittalGrave": {
        "codepoint": "U+E3F3",
        "description": "Grave, 5 schisma down, 2 cents down"
    },
    "accSagittalShaftDown": {
        "codepoint": "U+E3F1",
        "description": "Shaft down, (natural for use with only diacritics down)"
    },
    "accSagittalShaftUp": {
        "codepoint": "U+E3F0",
        "description": "Shaft up, (natural for use with only diacritics up)"
    },
    "accSagittalSharp": {
        "codepoint": "U+E318",
        "description": "Sharp, (apotome up)[almost all EDOs], 1/2-tone up"
    },
    "accSagittalSharp11LUp": {
        "codepoint": "U+E328",
        "description": "Sharp 11L-up, 8\u00b0 up [46 EDO]"
    },
    "accSagittalSharp11MUp": {
        "codepoint": "U+E326",
        "description": "Sharp 11M-up, 3\u00b0 up [17 31 EDOs], 7\u00b0 up [46 EDO], 3/4-tone up"
    },
    "accSagittalSharp11v19LUp": {
        "codepoint": "U+E3DA",
        "description": "Sharp 11:19L-up"
    },
    "accSagittalSharp11v19MUp": {
        "codepoint": "U+E3D2",
        "description": "Sharp 11:19M-up"
    },
    "accSagittalSharp11v49CDown": {
        "codepoint": "U+E3B8",
        "description": "Sharp 11:49C-down"
    },
    "accSagittalSharp11v49CUp": {
        "codepoint": "U+E3C6",
        "description": "Sharp 11:49C-up"
    },
    "accSagittalSharp143CDown": {
        "codepoint": "U+E3BA",
        "description": "Sharp 143C-down"
    },
    "accSagittalSharp143CUp": {
        "codepoint": "U+E3C4",
        "description": "Sharp 143C-up"
    },
    "accSagittalSharp17CDown": {
        "codepoint": "U+E350",
        "description": "Sharp 17C-down"
    },
    "accSagittalSharp17CUp": {
        "codepoint": "U+E356",
        "description": "Sharp 17C-up"
    },
    "accSagittalSharp17kDown": {
        "codepoint": "U+E3BC",
        "description": "Sharp 17k-down"
    },
    "accSagittalSharp17kUp": {
        "codepoint": "U+E3C2",
        "description": "Sharp 17k-up"
    },
    "accSagittalSharp19CDown": {
        "codepoint": "U+E3B6",
        "description": "Sharp 19C-down"
    },
    "accSagittalSharp19CUp": {
        "codepoint": "U+E3C8",
        "description": "Sharp 19C-up"
    },
    "accSagittalSharp19sDown": {
        "codepoint": "U+E3BE",
        "description": "Sharp 19s-down"
    },
    "accSagittalSharp19sUp": {
        "codepoint": "U+E3C0",
        "description": "Sharp 19s-up"
    },
    "accSagittalSharp23CDown": {
        "codepoint": "U+E37A",
        "description": "Sharp 23C-down, 6\u00b0 up [96 EDO], 3/8-tone up"
    },
    "accSagittalSharp23CUp": {
        "codepoint": "U+E37C",
        "description": "Sharp 23C-up, 10\u00b0 up [96 EDO], 5/8-tone up"
    },
    "accSagittalSharp23SDown": {
        "codepoint": "U+E3B0",
        "description": "Sharp 23S-down"
    },
    "accSagittalSharp23SUp": {
        "codepoint": "U+E3CE",
        "description": "Sharp 23S-up"
    },
    "accSagittalSharp25SDown": {
        "codepoint": "U+E310",
        "description": "Sharp 25S-down, 3\u00b0 up [53 EDO]"
    },
    "accSagittalSharp25SUp": {
        "codepoint": "U+E322",
        "description": "Sharp 25S-up, 7\u00b0 up [53 EDO]"
    },
    "accSagittalSharp35LUp": {
        "codepoint": "U+E32A",
        "description": "Sharp 35L-up, 5\u00b0 up [50 EDO]"
    },
    "accSagittalSharp35MUp": {
        "codepoint": "U+E324",
        "description": "Sharp 35M-up, 4\u00b0 up [50 EDO], 6\u00b0 up [27 EDO], 13/18-tone up"
    },
    "accSagittalSharp49LUp": {
        "codepoint": "U+E3D8",
        "description": "Sharp 49L-up"
    },
    "accSagittalSharp49MUp": {
        "codepoint": "U+E3D4",
        "description": "Sharp 49M-up"
    },
    "accSagittalSharp49SDown": {
        "codepoint": "U+E3B2",
        "description": "Sharp 49S-down"
    },
    "accSagittalSharp49SUp": {
        "codepoint": "U+E3CC",
        "description": "Sharp 49S-up"
    },
    "accSagittalSharp55CDown": {
        "codepoint": "U+E34E",
        "description": "Sharp 55C-down, 5\u00b0 up [96 EDO], 5/16-tone up"
    },
    "accSagittalSharp55CUp": {
        "codepoint": "U+E358",
        "description": "Sharp 55C-up, 11\u00b0 up [96 EDO], 11/16-tone up"
    },
    "accSagittalSharp5CDown": {
        "codepoint": "U+E314",
        "description": "Sharp 5C-down, 2\u00b0[22 29] 3\u00b0[34 41] 4\u00b0[46 53 60] up, 5/12-tone up"
    },
    "accSagittalSharp5CUp": {
        "codepoint": "U+E31E",
        "description": "Sharp 5C-up, 4\u00b0[22 29] 5\u00b0[27 34 41] 6\u00b0[39 46 53] up, 7/12-tone up"
    },
    "accSagittalSharp5v11SDown": {
        "codepoint": "U+E34A",
        "description": "Sharp 5:11S-down"
    },
    "accSagittalSharp5v11SUp": {
        "codepoint": "U+E35C",
        "description": "Sharp 5:11S-up"
    },
    "accSagittalSharp5v13LUp": {
        "codepoint": "U+E3DC",
        "description": "Sharp 5:13L-up"
    },
    "accSagittalSharp5v13MUp": {
        "codepoint": "U+E3D0",
        "description": "Sharp 5:13M-up"
    },
    "accSagittalSharp5v19CDown": {
        "codepoint": "U+E378",
        "description": "Sharp 5:19C-down, 9/20-tone up"
    },
    "accSagittalSharp5v19CUp": {
        "codepoint": "U+E37E",
        "description": "Sharp 5:19C-up, 11/20-tone up"
    },
    "accSagittalSharp5v23SDown": {
        "codepoint": "U+E376",
        "description": "Sharp 5:23S-down, 3\u00b0 up [60 EDO], 3/10-tone up"
    },
    "accSagittalSharp5v23SUp": {
        "codepoint": "U+E380",
        "description": "Sharp 5:23S-up, 7\u00b0 up [60 EDO], 7/10-tone up"
    },
    "accSagittalSharp5v49MUp": {
        "codepoint": "U+E3D6",
        "description": "Sharp 5:49M-up, (one and a half apotomes)"
    },
    "accSagittalSharp5v7kDown": {
        "codepoint": "U+E316",
        "description": "Sharp 5:7k-down"
    },
    "accSagittalSharp5v7kUp": {
        "codepoint": "U+E31C",
        "description": "Sharp 5:7k-up"
    },
    "accSagittalSharp7CDown": {
        "codepoint": "U+E312",
        "description": "Sharp 7C-down, 2\u00b0 up [43 EDO], 4\u00b0 up [72 EDO], 1/3-tone up"
    },
    "accSagittalSharp7CUp": {
        "codepoint": "U+E320",
        "description": "Sharp 7C-up, 4\u00b0 up [43 EDO], 8\u00b0 up [72 EDO], 2/3-tone up"
    },
    "accSagittalSharp7v11CDown": {
        "codepoint": "U+E34C",
        "description": "Sharp 7:11C-down, 4\u00b0 up [60 EDO], 2/5-tone up"
    },
    "accSagittalSharp7v11CUp": {
        "codepoint": "U+E35A",
        "description": "Sharp 7:11C-up, 6\u00b0 up [60 EDO], 3/5- tone up"
    },
    "accSagittalSharp7v11kDown": {
        "codepoint": "U+E352",
        "description": "Sharp 7:11k-down"
    },
    "accSagittalSharp7v11kUp": {
        "codepoint": "U+E354",
        "description": "Sharp 7:11k-up"
    },
    "accSagittalSharp7v19CDown": {
        "codepoint": "U+E3B4",
        "description": "Sharp 7:19C-down"
    },
    "accSagittalSharp7v19CUp": {
        "codepoint": "U+E3CA",
        "description": "Sharp 7:19C-up"
    },
    "accSagittalUnused1": {
        "codepoint": "U+E31A",
        "description": "Unused"
    },
    "accSagittalUnused2": {
        "codepoint": "U+E31B",
        "description": "Unused"
    },
    "accSagittalUnused3": {
        "codepoint": "U+E3DE",
        "description": "Unused"
    },
    "accSagittalUnused4": {
        "codepoint": "U+E3DF",
        "description": "Unused"
    },
    "accdnCombDot": {
        "codepoint": "U+E8CA",
        "description": "Combining accordion coupler dot"
    },
    "accdnCombLH2RanksEmpty": {
        "codepoint": "U+E8C8",
        "description": "Combining left hand, 2 ranks, empty"
    },
    "accdnCombLH3RanksEmptySquare": {
        "codepoint": "U+E8C9",
        "description": "Combining left hand, 3 ranks, empty (square)"
    },
    "accdnCombRH3RanksEmpty": {
        "codepoint": "U+E8C6",
        "description": "Combining right hand, 3 ranks, empty"
    },
    "accdnCombRH4RanksEmpty": {
        "codepoint": "U+E8C7",
        "description": "Combining right hand, 4 ranks, empty"
    },
    "accdnDiatonicClef": {
        "codepoint": "U+E079",
        "description": "Diatonic accordion clef"
    },
    "accdnLH2Ranks16Round": {
        "codepoint": "U+E8BC",
        "description": "Left hand, 2 ranks, 16' stop (round)"
    },
    "accdnLH2Ranks8Plus16Round": {
        "codepoint": "U+E8BD",
        "description": "Left hand, 2 ranks, 8' stop + 16' stop (round)"
    },
    "accdnLH2Ranks8Round": {
        "codepoint": "U+E8BB",
        "description": "Left hand, 2 ranks, 8' stop (round)"
    },
    "accdnLH2RanksFullMasterRound": {
        "codepoint": "U+E8C0",
        "description": "Left hand, 2 ranks, full master (round)"
    },
    "accdnLH2RanksMasterPlus16Round": {
        "codepoint": "U+E8BF",
        "description": "Left hand, 2 ranks, master + 16' stop (round)"
    },
    "accdnLH2RanksMasterRound": {
        "codepoint": "U+E8BE",
        "description": "Left hand, 2 ranks, master (round)"
    },
    "accdnLH3Ranks2Plus8Square": {
        "codepoint": "U+E8C4",
        "description": "Left hand, 3 ranks, 2' stop + 8' stop (square)"
    },
    "accdnLH3Ranks2Square": {
        "codepoint": "U+E8C2",
        "description": "Left hand, 3 ranks, 2' stop (square)"
    },
    "accdnLH3Ranks8Square": {
        "codepoint": "U+E8C1",
        "description": "Left hand, 3 ranks, 8' stop (square)"
    },
    "accdnLH3RanksDouble8Square": {
        "codepoint": "U+E8C3",
        "description": "Left hand, 3 ranks, double 8' stop (square)"
    },
    "accdnLH3RanksTuttiSquare": {
        "codepoint": "U+E8C5",
        "description": "Left hand, 3 ranks, 2' stop + double 8' stop (tutti) (square)"
    },
    "accdnPull": {
        "codepoint": "U+E8CC",
        "description": "Pull"
    },
    "accdnPush": {
        "codepoint": "U+E8CB",
        "description": "Push"
    },
    "accdnRH3RanksAccordion": {
        "codepoint": "U+E8AC",
        "description": "Right hand, 3 ranks, 8' stop + upper tremolo 8' stop + 16' stop (accordion)"
    },
    "accdnRH3RanksAuthenticMusette": {
        "codepoint": "U+E8A8",
        "description": "Right hand, 3 ranks, lower tremolo 8' stop + 8' stop + upper tremolo 8' stop (authentic musette)"
    },
    "accdnRH3RanksBandoneon": {
        "codepoint": "U+E8AB",
        "description": "Right hand, 3 ranks, 8' stop + 16' stop (bandone\u00f3n)"
    },
    "accdnRH3RanksBassoon": {
        "codepoint": "U+E8A4",
        "description": "Right hand, 3 ranks, 16' stop (bassoon)"
    },
    "accdnRH3RanksClarinet": {
        "codepoint": "U+E8A1",
        "description": "Right hand, 3 ranks, 8' stop (clarinet)"
    },
    "accdnRH3RanksDoubleTremoloLower8ve": {
        "codepoint": "U+E8B1",
        "description": "Right hand, 3 ranks, lower tremolo 8' stop + 8' stop + upper tremolo 8' stop + 16' stop"
    },
    "accdnRH3RanksDoubleTremoloUpper8ve": {
        "codepoint": "U+E8B2",
        "description": "Right hand, 3 ranks, 4' stop + lower tremolo 8' stop + 8' stop + upper tremolo 8' stop"
    },
    "accdnRH3RanksFullFactory": {
        "codepoint": "U+E8B3",
        "description": "Right hand, 3 ranks, 4' stop + lower tremolo 8' stop + 8' stop + upper tremolo 8' stop + 16' stop"
    },
    "accdnRH3RanksHarmonium": {
        "codepoint": "U+E8AA",
        "description": "Right hand, 3 ranks, 4' stop + 8' stop + 16' stop (harmonium)"
    },
    "accdnRH3RanksImitationMusette": {
        "codepoint": "U+E8A7",
        "description": "Right hand, 3 ranks, 4' stop + 8' stop + upper tremolo 8' stop (imitation musette)"
    },
    "accdnRH3RanksLowerTremolo8": {
        "codepoint": "U+E8A3",
        "description": "Right hand, 3 ranks, lower tremolo 8' stop"
    },
    "accdnRH3RanksMaster": {
        "codepoint": "U+E8AD",
        "description": "Right hand, 3 ranks, 4' stop + lower tremolo 8' stop + upper tremolo 8' stop + 16' stop (master)"
    },
    "accdnRH3RanksOboe": {
        "codepoint": "U+E8A5",
        "description": "Right hand, 3 ranks, 4' stop + 8' stop (oboe)"
    },
    "accdnRH3RanksOrgan": {
        "codepoint": "U+E8A9",
        "description": "Right hand, 3 ranks, 4' stop + 16' stop (organ)"
    },
    "accdnRH3RanksPiccolo": {
        "codepoint": "U+E8A0",
        "description": "Right hand, 3 ranks, 4' stop (piccolo)"
    },
    "accdnRH3RanksTremoloLower8ve": {
        "codepoint": "U+E8AF",
        "description": "Right hand, 3 ranks, lower tremolo 8' stop + upper tremolo 8' stop + 16' stop"
    },
    "accdnRH3RanksTremoloUpper8ve": {
        "codepoint": "U+E8B0",
        "description": "Right hand, 3 ranks, 4' stop + lower tremolo 8' stop + upper tremolo 8' stop"
    },
    "accdnRH3RanksTwoChoirs": {
        "codepoint": "U+E8AE",
        "description": "Right hand, 3 ranks, lower tremolo 8' stop + upper tremolo 8' stop"
    },
    "accdnRH3RanksUpperTremolo8": {
        "codepoint": "U+E8A2",
        "description": "Right hand, 3 ranks, upper tremolo 8' stop"
    },
    "accdnRH3RanksViolin": {
        "codepoint": "U+E8A6",
        "description": "Right hand, 3 ranks, 8' stop + upper tremolo 8' stop (violin)"
    },
    "accdnRH4RanksAlto": {
        "codepoint": "U+E8B5",
        "description": "Right hand, 4 ranks, alto"
    },
    "accdnRH4RanksBassAlto": {
        "codepoint": "U+E8BA",
        "description": "Right hand, 4 ranks, bass/alto"
    },
    "accdnRH4RanksMaster": {
        "codepoint": "U+E8B7",
        "description": "Right hand, 4 ranks, master"
    },
    "accdnRH4RanksSoftBass": {
        "codepoint": "U+E8B8",
        "description": "Right hand, 4 ranks, soft bass"
    },
    "accdnRH4RanksSoftTenor": {
        "codepoint": "U+E8B9",
        "description": "Right hand, 4 ranks, soft tenor"
    },
    "accdnRH4RanksSoprano": {
        "codepoint": "U+E8B4",
        "description": "Right hand, 4 ranks, soprano"
    },
    "accdnRH4RanksTenor": {
        "codepoint": "U+E8B6",
        "description": "Right hand, 4 ranks, tenor"
    },
    "accdnRicochet2": {
        "codepoint": "U+E8CD",
        "description": "Ricochet (2 tones)"
    },
    "accdnRicochet3": {
        "codepoint": "U+E8CE",
        "description": "Ricochet (3 tones)"
    },
    "accdnRicochet4": {
        "codepoint": "U+E8CF",
        "description": "Ricochet (4 tones)"
    },
    "accdnRicochet5": {
        "codepoint": "U+E8D0",
        "description": "Ricochet (5 tones)"
    },
    "accdnRicochet6": {
        "codepoint": "U+E8D1",
        "description": "Ricochet (6 tones)"
    },
    "accdnRicochetStem2": {
        "codepoint": "U+E8D2",
        "description": "Combining ricochet for stem (2 tones)"
    },
    "accdnRicochetStem3": {
        "codepoint": "U+E8D3",
        "description": "Combining ricochet for stem (3 tones)"
    },
    "accdnRicochetStem4": {
        "codepoint": "U+E8D4",
        "description": "Combining ricochet for stem (4 tones)"
    },
    "accdnRicochetStem5": {
        "codepoint": "U+E8D5",
        "description": "Combining ricochet for stem (5 tones)"
    },
    "accdnRicochetStem6": {
        "codepoint": "U+E8D6",
        "description": "Combining ricochet for stem (6 tones)"
    },
    "accidental1CommaFlat": {
        "codepoint": "U+E454",
        "description": "1-comma flat"
    },
    "accidental1CommaSharp": {
        "codepoint": "U+E450",
        "description": "1-comma sharp"
    },
    "accidental2CommaFlat": {
        "codepoint": "U+E455",
        "description": "2-comma flat"
    },
    "accidental2CommaSharp": {
        "codepoint": "U+E451",
        "description": "2-comma sharp"
    },
    "accidental3CommaFlat": {
        "codepoint": "U+E456",
        "description": "3-comma flat"
    },
    "accidental3CommaSharp": {
        "codepoint": "U+E452",
        "description": "3-comma sharp"
    },
    "accidental4CommaFlat": {
        "codepoint": "U+E457",
        "description": "4-comma flat"
    },
    "accidental5CommaSharp": {
        "codepoint": "U+E453",
        "description": "5-comma sharp"
    },
    "accidentalArrowDown": {
        "codepoint": "U+E27B",
        "description": "Arrow down (lower by one quarter-tone)"
    },
    "accidentalArrowUp": {
        "codepoint": "U+E27A",
        "description": "Arrow up (raise by one quarter-tone)"
    },
    "accidentalBakiyeFlat": {
        "codepoint": "U+E442",
        "description": "Bakiye (flat)"
    },
    "accidentalBakiyeSharp": {
        "codepoint": "U+E445",
        "description": "Bakiye (sharp)"
    },
    "accidentalBracketLeft": {
        "codepoint": "U+E26C",
        "description": "Accidental bracket, left"
    },
    "accidentalBracketRight": {
        "codepoint": "U+E26D",
        "description": "Accidental bracket, right"
    },
    "accidentalBuyukMucennebFlat": {
        "codepoint": "U+E440",
        "description": "B\u00fcy\u00fck m\u00fccenneb (flat)"
    },
    "accidentalBuyukMucennebSharp": {
        "codepoint": "U+E447",
        "description": "B\u00fcy\u00fck m\u00fccenneb (sharp)"
    },
    "accidentalCombiningCloseCurlyBrace": {
        "codepoint": "U+E2EF",
        "description": "Combining close curly brace"
    },
    "accidentalCombiningLower17Schisma": {
        "codepoint": "U+E2E6",
        "description": "Combining lower by one 17-limit schisma"
    },
    "accidentalCombiningLower19Schisma": {
        "codepoint": "U+E2E8",
        "description": "Combining lower by one 19-limit schisma"
    },
    "accidentalCombiningLower23Limit29LimitComma": {
        "codepoint": "U+E2EA",
        "description": "Combining lower by one 23-limit comma or 29-limit comma"
    },
    "accidentalCombiningLower31Schisma": {
        "codepoint": "U+E2EC",
        "description": "Combining lower by one 31-limit schisma"
    },
    "accidentalCombiningLower53LimitComma": {
        "codepoint": "U+E2F7",
        "description": "Combining lower by one 53-limit comma"
    },
    "accidentalCombiningOpenCurlyBrace": {
        "codepoint": "U+E2EE",
        "description": "Combining open curly brace"
    },
    "accidentalCombiningRaise17Schisma": {
        "codepoint": "U+E2E7",
        "description": "Combining raise by one 17-limit schisma"
    },
    "accidentalCombiningRaise19Schisma": {
        "codepoint": "U+E2E9",
        "description": "Combining raise by one 19-limit schisma"
    },
    "accidentalCombiningRaise23Limit29LimitComma": {
        "codepoint": "U+E2EB",
        "description": "Combining raise by one 23-limit comma or 29-limit comma"
    },
    "accidentalCombiningRaise31Schisma": {
        "codepoint": "U+E2ED",
        "description": "Combining raise by one 31-limit schisma"
    },
    "accidentalCombiningRaise53LimitComma": {
        "codepoint": "U+E2F8",
        "description": "Combining raise by one 53-limit comma"
    },
    "accidentalCommaSlashDown": {
        "codepoint": "U+E47A",
        "description": "Syntonic/Didymus comma (80:81) down (Bosanquet)"
    },
    "accidentalCommaSlashUp": {
        "codepoint": "U+E479",
        "description": "Syntonic/Didymus comma (80:81) up (Bosanquet)"
    },
    "accidentalDoubleFlat": {
        "alternateCodepoint": "U+1D12B",
        "codepoint": "U+E264",
        "description": "Double flat"
    },
    "accidentalDoubleFlatArabic": {
        "codepoint": "U+ED30",
        "description": "Arabic double flat"
    },
    "accidentalDoubleFlatEqualTempered": {
        "codepoint": "U+E2F0",
        "description": "Double flat equal tempered semitone"
    },
    "accidentalDoubleFlatOneArrowDown": {
        "codepoint": "U+E2C0",
        "description": "Double flat lowered by one syntonic comma"
    },
    "accidentalDoubleFlatOneArrowUp": {
        "codepoint": "U+E2C5",
        "description": "Double flat raised by one syntonic comma"
    },
    "accidentalDoubleFlatReversed": {
        "codepoint": "U+E483",
        "description": "Reversed double flat"
    },
    "accidentalDoubleFlatThreeArrowsDown": {
        "codepoint": "U+E2D4",
        "description": "Double flat lowered by three syntonic commas"
    },
    "accidentalDoubleFlatThreeArrowsUp": {
        "codepoint": "U+E2D9",
        "description": "Double flat raised by three syntonic commas"
    },
    "accidentalDoubleFlatTurned": {
        "codepoint": "U+E485",
        "description": "Turned double flat"
    },
    "accidentalDoubleFlatTwoArrowsDown": {
        "codepoint": "U+E2CA",
        "description": "Double flat lowered by two syntonic commas"
    },
    "accidentalDoubleFlatTwoArrowsUp": {
        "codepoint": "U+E2CF",
        "description": "Double flat raised by two syntonic commas"
    },
    "accidentalDoubleSharp": {
        "alternateCodepoint": "U+1D12A",
        "codepoint": "U+E263",
        "description": "Double sharp"
    },
    "accidentalDoubleSharpArabic": {
        "codepoint": "U+ED38",
        "description": "Arabic double sharp"
    },
    "accidentalDoubleSharpEqualTempered": {
        "codepoint": "U+E2F4",
        "description": "Double sharp equal tempered semitone"
    },
    "accidentalDoubleSharpOneArrowDown": {
        "codepoint": "U+E2C4",
        "description": "Double sharp lowered by one syntonic comma"
    },
    "accidentalDoubleSharpOneArrowUp": {
        "codepoint": "U+E2C9",
        "description": "Double sharp raised by one syntonic comma"
    },
    "accidentalDoubleSharpThreeArrowsDown": {
        "codepoint": "U+E2D8",
        "description": "Double sharp lowered by three syntonic commas"
    },
    "accidentalDoubleSharpThreeArrowsUp": {
        "codepoint": "U+E2DD",
        "description": "Double sharp raised by three syntonic commas"
    },
    "accidentalDoubleSharpTwoArrowsDown": {
        "codepoint": "U+E2CE",
        "description": "Double sharp lowered by two syntonic commas"
    },
    "accidentalDoubleSharpTwoArrowsUp": {
        "codepoint": "U+E2D3",
        "description": "Double sharp raised by two syntonic commas"
    },
    "accidentalEnharmonicAlmostEqualTo": {
        "codepoint": "U+E2FA",
        "description": "Enharmonically reinterpret accidental almost equal to"
    },
    "accidentalEnharmonicEquals": {
        "codepoint": "U+E2FB",
        "description": "Enharmonically reinterpret accidental equals"
    },
    "accidentalEnharmonicTilde": {
        "codepoint": "U+E2F9",
        "description": "Enharmonically reinterpret accidental tilde"
    },
    "accidentalFilledReversedFlatAndFlat": {
        "codepoint": "U+E296",
        "description": "Filled reversed flat and flat"
    },
    "accidentalFilledReversedFlatAndFlatArrowDown": {
        "codepoint": "U+E298",
        "description": "Filled reversed flat and flat with arrow down"
    },
    "accidentalFilledReversedFlatAndFlatArrowUp": {
        "codepoint": "U+E297",
        "description": "Filled reversed flat and flat with arrow up"
    },
    "accidentalFilledReversedFlatArrowDown": {
        "codepoint": "U+E293",
        "description": "Filled reversed flat with arrow down"
    },
    "accidentalFilledReversedFlatArrowUp": {
        "codepoint": "U+E292",
        "description": "Filled reversed flat with arrow up"
    },
    "accidentalFiveQuarterTonesFlatArrowDown": {
        "codepoint": "U+E279",
        "description": "Five-quarter-tones flat"
    },
    "accidentalFiveQuarterTonesSharpArrowUp": {
        "codepoint": "U+E276",
        "description": "Five-quarter-tones sharp"
    },
    "accidentalFlat": {
        "alternateCodepoint": "U+266D",
        "codepoint": "U+E260",
        "description": "Flat"
    },
    "accidentalFlatArabic": {
        "codepoint": "U+ED32",
        "description": "Arabic half-tone flat"
    },
    "accidentalFlatEqualTempered": {
        "codepoint": "U+E2F1",
        "description": "Flat equal tempered semitone"
    },
    "accidentalFlatLoweredStockhausen": {
        "codepoint": "U+ED53",
        "description": "Lowered flat (Stockhausen)"
    },
    "accidentalFlatOneArrowDown": {
        "codepoint": "U+E2C1",
        "description": "Flat lowered by one syntonic comma"
    },
    "accidentalFlatOneArrowUp": {
        "codepoint": "U+E2C6",
        "description": "Flat raised by one syntonic comma"
    },
    "accidentalFlatRaisedStockhausen": {
        "codepoint": "U+ED52",
        "description": "Raised flat (Stockhausen)"
    },
    "accidentalFlatRepeatedLineStockhausen": {
        "codepoint": "U+ED5C",
        "description": "Repeated flat, note on line (Stockhausen)"
    },
    "accidentalFlatRepeatedSpaceStockhausen": {
        "codepoint": "U+ED5B",
        "description": "Repeated flat, note in space (Stockhausen)"
    },
    "accidentalFlatThreeArrowsDown": {
        "codepoint": "U+E2D5",
        "description": "Flat lowered by three syntonic commas"
    },
    "accidentalFlatThreeArrowsUp": {
        "codepoint": "U+E2DA",
        "description": "Flat raised by three syntonic commas"
    },
    "accidentalFlatTurned": {
        "codepoint": "U+E484",
        "description": "Turned flat"
    },
    "accidentalFlatTwoArrowsDown": {
        "codepoint": "U+E2CB",
        "description": "Flat lowered by two syntonic commas"
    },
    "accidentalFlatTwoArrowsUp": {
        "codepoint": "U+E2D0",
        "description": "Flat raised by two syntonic commas"
    },
    "accidentalHalfSharpArrowDown": {
        "codepoint": "U+E29A",
        "description": "Half sharp with arrow down"
    },
    "accidentalHalfSharpArrowUp": {
        "codepoint": "U+E299",
        "description": "Half sharp with arrow up"
    },
    "accidentalJohnston13": {
        "codepoint": "U+E2B6",
        "description": "Thirteen (raise by 65:64)"
    },
    "accidentalJohnston31": {
        "codepoint": "U+E2B7",
        "description": "Inverted 13 (lower by 65:64)"
    },
    "accidentalJohnstonDown": {
        "codepoint": "U+E2B5",
        "description": "Down arrow (lower by 33:32)"
    },
    "accidentalJohnstonEl": {
        "codepoint": "U+E2B2",
        "description": "Inverted seven (raise by 36:35)"
    },
    "accidentalJohnstonMinus": {
        "codepoint": "U+E2B1",
        "description": "Minus (lower by 81:80)"
    },
    "accidentalJohnstonPlus": {
        "codepoint": "U+E2B0",
        "description": "Plus (raise by 81:80)"
    },
    "accidentalJohnstonSeven": {
        "codepoint": "U+E2B3",
        "description": "Seven (lower by 36:35)"
    },
    "accidentalJohnstonUp": {
        "codepoint": "U+E2B4",
        "description": "Up arrow (raise by 33:32)"
    },
    "accidentalKomaFlat": {
        "codepoint": "U+E443",
        "description": "Koma (flat)"
    },
    "accidentalKomaSharp": {
        "codepoint": "U+E444",
        "description": "Koma (sharp)"
    },
    "accidentalKoron": {
        "codepoint": "U+E460",
        "description": "Koron (quarter tone flat)"
    },
    "accidentalKucukMucennebFlat": {
        "codepoint": "U+E441",
        "description": "K\u00fc\u00e7\u00fck m\u00fccenneb (flat)"
    },
    "accidentalKucukMucennebSharp": {
        "codepoint": "U+E446",
        "description": "K\u00fc\u00e7\u00fck m\u00fccenneb (sharp)"
    },
    "accidentalLargeDoubleSharp": {
        "codepoint": "U+E47D",
        "description": "Large double sharp"
    },
    "accidentalLowerOneSeptimalComma": {
        "codepoint": "U+E2DE",
        "description": "Lower by one septimal comma"
    },
    "accidentalLowerOneTridecimalQuartertone": {
        "codepoint": "U+E2E4",
        "description": "Lower by one tridecimal quartertone"
    },
    "accidentalLowerOneUndecimalQuartertone": {
        "codepoint": "U+E2E2",
        "description": "Lower by one undecimal quartertone"
    },
    "accidentalLowerTwoSeptimalCommas": {
        "codepoint": "U+E2E0",
        "description": "Lower by two septimal commas"
    },
    "accidentalLoweredStockhausen": {
        "codepoint": "U+ED51",
        "description": "Lowered (Stockhausen)"
    },
    "accidentalNarrowReversedFlat": {
        "codepoint": "U+E284",
        "description": "Narrow reversed flat(quarter-tone flat)"
    },
    "accidentalNarrowReversedFlatAndFlat": {
        "codepoint": "U+E285",
        "description": "Narrow reversed flat and flat(three-quarter-tones flat)"
    },
    "accidentalNatural": {
        "alternateCodepoint": "U+266E",
        "codepoint": "U+E261",
        "description": "Natural"
    },
    "accidentalNaturalArabic": {
        "codepoint": "U+ED34",
        "description": "Arabic natural"
    },
    "accidentalNaturalEqualTempered": {
        "codepoint": "U+E2F2",
        "description": "Natural equal tempered semitone"
    },
    "accidentalNaturalFlat": {
        "codepoint": "U+E267",
        "description": "Natural flat"
    },
    "accidentalNaturalLoweredStockhausen": {
        "codepoint": "U+ED55",
        "description": "Lowered natural (Stockhausen)"
    },
    "accidentalNaturalOneArrowDown": {
        "codepoint": "U+E2C2",
        "description": "Natural lowered by one syntonic comma"
    },
    "accidentalNaturalOneArrowUp": {
        "codepoint": "U+E2C7",
        "description": "Natural raised by one syntonic comma"
    },
    "accidentalNaturalRaisedStockhausen": {
        "codepoint": "U+ED54",
        "description": "Raised natural (Stockhausen)"
    },
    "accidentalNaturalReversed": {
        "codepoint": "U+E482",
        "description": "Reversed natural"
    },
    "accidentalNaturalSharp": {
        "codepoint": "U+E268",
        "description": "Natural sharp"
    },
    "accidentalNaturalThreeArrowsDown": {
        "codepoint": "U+E2D6",
        "description": "Natural lowered by three syntonic commas"
    },
    "accidentalNaturalThreeArrowsUp": {
        "codepoint": "U+E2DB",
        "description": "Natural raised by three syntonic commas"
    },
    "accidentalNaturalTwoArrowsDown": {
        "codepoint": "U+E2CC",
        "description": "Natural lowered by two syntonic commas"
    },
    "accidentalNaturalTwoArrowsUp": {
        "codepoint": "U+E2D1",
        "description": "Natural raised by two syntonic commas"
    },
    "accidentalOneAndAHalfSharpsArrowDown": {
        "codepoint": "U+E29C",
        "description": "One and a half sharps with arrow down"
    },
    "accidentalOneAndAHalfSharpsArrowUp": {
        "codepoint": "U+E29B",
        "description": "One and a half sharps with arrow up"
    },
    "accidentalOneQuarterToneFlatFerneyhough": {
        "codepoint": "U+E48F",
        "description": "One-quarter-tone flat (Ferneyhough)"
    },
    "accidentalOneQuarterToneFlatStockhausen": {
        "codepoint": "U+ED59",
        "description": "One-quarter-tone flat (Stockhausen)"
    },
    "accidentalOneQuarterToneSharpFerneyhough": {
        "codepoint": "U+E48E",
        "description": "One-quarter-tone sharp (Ferneyhough)"
    },
    "accidentalOneQuarterToneSharpStockhausen": {
        "codepoint": "U+ED58",
        "description": "One-quarter-tone sharp (Stockhausen)"
    },
    "accidentalOneThirdToneFlatFerneyhough": {
        "codepoint": "U+E48B",
        "description": "One-third-tone flat (Ferneyhough)"
    },
    "accidentalOneThirdToneSharpFerneyhough": {
        "codepoint": "U+E48A",
        "description": "One-third-tone sharp (Ferneyhough)"
    },
    "accidentalParensLeft": {
        "codepoint": "U+E26A",
        "description": "Accidental parenthesis, left"
    },
    "accidentalParensRight": {
        "codepoint": "U+E26B",
        "description": "Accidental parenthesis, right"
    },
    "accidentalQuarterFlatEqualTempered": {
        "codepoint": "U+E2F5",
        "description": "Lower by one equal tempered quarter-tone"
    },
    "accidentalQuarterSharpEqualTempered": {
        "codepoint": "U+E2F6",
        "description": "Raise by one equal tempered quarter tone"
    },
    "accidentalQuarterToneFlat4": {
        "alternateCodepoint": "U+1D133",
        "codepoint": "U+E47F",
        "description": "Quarter-tone flat"
    },
    "accidentalQuarterToneFlatArabic": {
        "codepoint": "U+ED33",
        "description": "Arabic quarter-tone flat"
    },
    "accidentalQuarterToneFlatArrowUp": {
        "alternateCodepoint": "U+1D12C",
        "codepoint": "U+E270",
        "description": "Quarter-tone flat"
    },
    "accidentalQuarterToneFlatFilledReversed": {
        "codepoint": "U+E480",
        "description": "Filled reversed flat (quarter-tone flat)"
    },
    "accidentalQuarterToneFlatNaturalArrowDown": {
        "alternateCodepoint": "U+1D12F",
        "codepoint": "U+E273",
        "description": "Quarter-tone flat"
    },
    "accidentalQuarterToneFlatPenderecki": {
        "codepoint": "U+E478",
        "description": "Quarter tone flat (Penderecki)"
    },
    "accidentalQuarterToneFlatStein": {
        "codepoint": "U+E280",
        "description": "Reversed flat (quarter-tone flat) (Stein)"
    },
    "accidentalQuarterToneFlatVanBlankenburg": {
        "codepoint": "U+E488",
        "description": "Quarter-tone flat (van Blankenburg)"
    },
    "accidentalQuarterToneSharp4": {
        "alternateCodepoint": "U+1D132",
        "codepoint": "U+E47E",
        "description": "Quarter-tone sharp"
    },
    "accidentalQuarterToneSharpArabic": {
        "codepoint": "U+ED35",
        "description": "Arabic quarter-tone sharp"
    },
    "accidentalQuarterToneSharpArrowDown": {
        "alternateCodepoint": "U+1D131",
        "codepoint": "U+E275",
        "description": "Quarter-tone sharp"
    },
    "accidentalQuarterToneSharpBusotti": {
        "codepoint": "U+E472",
        "description": "Quarter tone sharp (Bussotti)"
    },
    "accidentalQuarterToneSharpNaturalArrowUp": {
        "alternateCodepoint": "U+1D12E",
        "codepoint": "U+E272",
        "description": "Quarter-tone sharp"
    },
    "accidentalQuarterToneSharpStein": {
        "codepoint": "U+E282",
        "description": "Half sharp (quarter-tone sharp) (Stein)"
    },
    "accidentalQuarterToneSharpWiggle": {
        "codepoint": "U+E475",
        "description": "Quarter tone sharp with wiggly tail"
    },
    "accidentalRaiseOneSeptimalComma": {
        "codepoint": "U+E2DF",
        "description": "Raise by one septimal comma"
    },
    "accidentalRaiseOneTridecimalQuartertone": {
        "codepoint": "U+E2E5",
        "description": "Raise by one tridecimal quartertone"
    },
    "accidentalRaiseOneUndecimalQuartertone": {
        "codepoint": "U+E2E3",
        "description": "Raise by one undecimal quartertone"
    },
    "accidentalRaiseTwoSeptimalCommas": {
        "codepoint": "U+E2E1",
        "description": "Raise by two septimal commas"
    },
    "accidentalRaisedStockhausen": {
        "codepoint": "U+ED50",
        "description": "Raised (Stockhausen)"
    },
    "accidentalReversedFlatAndFlatArrowDown": {
        "codepoint": "U+E295",
        "description": "Reversed flat and flat with arrow down"
    },
    "accidentalReversedFlatAndFlatArrowUp": {
        "codepoint": "U+E294",
        "description": "Reversed flat and flat with arrow up"
    },
    "accidentalReversedFlatArrowDown": {
        "codepoint": "U+E291",
        "description": "Reversed flat with arrow down"
    },
    "accidentalReversedFlatArrowUp": {
        "codepoint": "U+E290",
        "description": "Reversed flat with arrow up"
    },
    "accidentalSharp": {
        "alternateCodepoint": "U+266F",
        "codepoint": "U+E262",
        "description": "Sharp"
    },
    "accidentalSharpArabic": {
        "codepoint": "U+ED36",
        "description": "Arabic half-tone sharp"
    },
    "accidentalSharpEqualTempered": {
        "codepoint": "U+E2F3",
        "description": "Sharp equal tempered semitone"
    },
    "accidentalSharpLoweredStockhausen": {
        "codepoint": "U+ED57",
        "description": "Lowered sharp (Stockhausen)"
    },
    "accidentalSharpOneArrowDown": {
        "codepoint": "U+E2C3",
        "description": "Sharp lowered by one syntonic comma"
    },
    "accidentalSharpOneArrowUp": {
        "codepoint": "U+E2C8",
        "description": "Sharp raised by one syntonic comma"
    },
    "accidentalSharpOneHorizontalStroke": {
        "codepoint": "U+E473",
        "description": "One or three quarter tones sharp"
    },
    "accidentalSharpRaisedStockhausen": {
        "codepoint": "U+ED56",
        "description": "Raised sharp (Stockhausen)"
    },
    "accidentalSharpRepeatedLineStockhausen": {
        "codepoint": "U+ED5E",
        "description": "Repeated sharp, note on line (Stockhausen)"
    },
    "accidentalSharpRepeatedSpaceStockhausen": {
        "codepoint": "U+ED5D",
        "description": "Repeated sharp, note in space (Stockhausen)"
    },
    "accidentalSharpReversed": {
        "codepoint": "U+E481",
        "description": "Reversed sharp"
    },
    "accidentalSharpSharp": {
        "codepoint": "U+E269",
        "description": "Sharp sharp"
    },
    "accidentalSharpThreeArrowsDown": {
        "codepoint": "U+E2D7",
        "description": "Sharp lowered by three syntonic commas"
    },
    "accidentalSharpThreeArrowsUp": {
        "codepoint": "U+E2DC",
        "description": "Sharp raised by three syntonic commas"
    },
    "accidentalSharpTwoArrowsDown": {
        "codepoint": "U+E2CD",
        "description": "Sharp lowered by two syntonic commas"
    },
    "accidentalSharpTwoArrowsUp": {
        "codepoint": "U+E2D2",
        "description": "Sharp raised by two syntonic commas"
    },
    "accidentalSims12Down": {
        "codepoint": "U+E2A0",
        "description": "1/12 tone low"
    },
    "accidentalSims12Up": {
        "codepoint": "U+E2A3",
        "description": "1/12 tone high"
    },
    "accidentalSims4Down": {
        "codepoint": "U+E2A2",
        "description": "1/4 tone low"
    },
    "accidentalSims4Up": {
        "codepoint": "U+E2A5",
        "description": "1/4 tone high"
    },
    "accidentalSims6Down": {
        "codepoint": "U+E2A1",
        "description": "1/6 tone low"
    },
    "accidentalSims6Up": {
        "codepoint": "U+E2A4",
        "description": "1/6 tone high"
    },
    "accidentalSori": {
        "codepoint": "U+E461",
        "description": "Sori (quarter tone sharp)"
    },
    "accidentalTavenerFlat": {
        "codepoint": "U+E477",
        "description": "Byzantine-style Bakiye flat (Tavener)"
    },
    "accidentalTavenerSharp": {
        "codepoint": "U+E476",
        "description": "Byzantine-style Bu\u0308yu\u0308k mu\u0308cenneb sharp (Tavener)"
    },
    "accidentalThreeQuarterTonesFlatArabic": {
        "codepoint": "U+ED31",
        "description": "Arabic three-quarter-tones flat"
    },
    "accidentalThreeQuarterTonesFlatArrowDown": {
        "alternateCodepoint": "U+1D12D",
        "codepoint": "U+E271",
        "description": "Three-quarter-tones flat"
    },
    "accidentalThreeQuarterTonesFlatArrowUp": {
        "codepoint": "U+E278",
        "description": "Three-quarter-tones flat"
    },
    "accidentalThreeQuarterTonesFlatCouper": {
        "codepoint": "U+E489",
        "description": "Three-quarter-tones flat (Couper)"
    },
    "accidentalThreeQuarterTonesFlatGrisey": {
        "codepoint": "U+E486",
        "description": "Three-quarter-tones flat (Grisey)"
    },
    "accidentalThreeQuarterTonesFlatTartini": {
        "codepoint": "U+E487",
        "description": "Three-quarter-tones flat (Tartini)"
    },
    "accidentalThreeQuarterTonesFlatZimmermann": {
        "codepoint": "U+E281",
        "description": "Reversed flat and flat (three-quarter-tones flat) (Zimmermann)"
    },
    "accidentalThreeQuarterTonesSharpArabic": {
        "codepoint": "U+ED37",
        "description": "Arabic three-quarter-tones sharp"
    },
    "accidentalThreeQuarterTonesSharpArrowDown": {
        "codepoint": "U+E277",
        "description": "Three-quarter-tones sharp"
    },
    "accidentalThreeQuarterTonesSharpArrowUp": {
        "alternateCodepoint": "U+1D130",
        "codepoint": "U+E274",
        "description": "Three-quarter-tones sharp"
    },
    "accidentalThreeQuarterTonesSharpBusotti": {
        "codepoint": "U+E474",
        "description": "Three quarter tones sharp (Bussotti)"
    },
    "accidentalThreeQuarterTonesSharpStein": {
        "codepoint": "U+E283",
        "description": "One and a half sharps (three-quarter-tones sharp) (Stein)"
    },
    "accidentalThreeQuarterTonesSharpStockhausen": {
        "codepoint": "U+ED5A",
        "description": "Three-quarter-tones sharp (Stockhausen)"
    },
    "accidentalTripleFlat": {
        "codepoint": "U+E266",
        "description": "Triple flat"
    },
    "accidentalTripleSharp": {
        "codepoint": "U+E265",
        "description": "Triple sharp"
    },
    "accidentalTwoThirdTonesFlatFerneyhough": {
        "codepoint": "U+E48D",
        "description": "Two-third-tones flat (Ferneyhough)"
    },
    "accidentalTwoThirdTonesSharpFerneyhough": {
        "codepoint": "U+E48C",
        "description": "Two-third-tones sharp (Ferneyhough)"
    },
    "accidentalWilsonMinus": {
        "codepoint": "U+E47C",
        "description": "Wilson minus (5 comma down)"
    },
    "accidentalWilsonPlus": {
        "codepoint": "U+E47B",
        "description": "Wilson plus (5 comma up)"
    },
    "accidentalWyschnegradsky10TwelfthsFlat": {
        "codepoint": "U+E434",
        "description": "5/6 tone flat"
    },
    "accidentalWyschnegradsky10TwelfthsSharp": {
        "codepoint": "U+E429",
        "description": "5/6 tone sharp"
    },
    "accidentalWyschnegradsky11TwelfthsFlat": {
        "codepoint": "U+E435",
        "description": "11/12 tone flat"
    },
    "accidentalWyschnegradsky11TwelfthsSharp": {
        "codepoint": "U+E42A",
        "description": "11/12 tone sharp"
    },
    "accidentalWyschnegradsky1TwelfthsFlat": {
        "codepoint": "U+E42B",
        "description": "1/12 tone flat"
    },
    "accidentalWyschnegradsky1TwelfthsSharp": {
        "codepoint": "U+E420",
        "description": "1/12 tone sharp"
    },
    "accidentalWyschnegradsky2TwelfthsFlat": {
        "codepoint": "U+E42C",
        "description": "1/6 tone flat"
    },
    "accidentalWyschnegradsky2TwelfthsSharp": {
        "codepoint": "U+E421",
        "description": "1/6 tone sharp"
    },
    "accidentalWyschnegradsky3TwelfthsFlat": {
        "codepoint": "U+E42D",
        "description": "1/4 tone flat"
    },
    "accidentalWyschnegradsky3TwelfthsSharp": {
        "codepoint": "U+E422",
        "description": "1/4 tone sharp"
    },
    "accidentalWyschnegradsky4TwelfthsFlat": {
        "codepoint": "U+E42E",
        "description": "1/3 tone flat"
    },
    "accidentalWyschnegradsky4TwelfthsSharp": {
        "codepoint": "U+E423",
        "description": "1/3 tone sharp"
    },
    "accidentalWyschnegradsky5TwelfthsFlat": {
        "codepoint": "U+E42F",
        "description": "5/12 tone flat"
    },
    "accidentalWyschnegradsky5TwelfthsSharp": {
        "codepoint": "U+E424",
        "description": "5/12 tone sharp"
    },
    "accidentalWyschnegradsky6TwelfthsFlat": {
        "codepoint": "U+E430",
        "description": "1/2 tone flat"
    },
    "accidentalWyschnegradsky6TwelfthsSharp": {
        "codepoint": "U+E425",
        "description": "1/2 tone sharp"
    },
    "accidentalWyschnegradsky7TwelfthsFlat": {
        "codepoint": "U+E431",
        "description": "7/12 tone flat"
    },
    "accidentalWyschnegradsky7TwelfthsSharp": {
        "codepoint": "U+E426",
        "description": "7/12 tone sharp"
    },
    "accidentalWyschnegradsky8TwelfthsFlat": {
        "codepoint": "U+E432",
        "description": "2/3 tone flat"
    },
    "accidentalWyschnegradsky8TwelfthsSharp": {
        "codepoint": "U+E427",
        "description": "2/3 tone sharp"
    },
    "accidentalWyschnegradsky9TwelfthsFlat": {
        "codepoint": "U+E433",
        "description": "3/4 tone flat"
    },
    "accidentalWyschnegradsky9TwelfthsSharp": {
        "codepoint": "U+E428",
        "description": "3/4 tone sharp"
    },
    "accidentalXenakisOneThirdToneSharp": {
        "codepoint": "U+E470",
        "description": "One-third-tone sharp (Xenakis)"
    },
    "accidentalXenakisTwoThirdTonesSharp": {
        "codepoint": "U+E471",
        "description": "Two-third-tones sharp (Xenakis)"
    },
    "analyticsChoralmelodie": {
        "codepoint": "U+E86A",
        "description": "Choralmelodie (Berg)"
    },
    "analyticsEndStimme": {
        "alternateCodepoint": "U+1D1A8",
        "codepoint": "U+E863",
        "description": "End of stimme"
    },
    "analyticsHauptrhythmus": {
        "codepoint": "U+E86B",
        "description": "Hauptrhythmus (Berg)"
    },
    "analyticsHauptstimme": {
        "alternateCodepoint": "U+1D1A6",
        "codepoint": "U+E860",
        "description": "Hauptstimme"
    },
    "analyticsInversion1": {
        "codepoint": "U+E869",
        "description": "Inversion 1"
    },
    "analyticsNebenstimme": {
        "alternateCodepoint": "U+1D1A7",
        "codepoint": "U+E861",
        "description": "Nebenstimme"
    },
    "analyticsStartStimme": {
        "codepoint": "U+E862",
        "description": "Start of stimme"
    },
    "analyticsTheme": {
        "codepoint": "U+E864",
        "description": "Theme"
    },
    "analyticsTheme1": {
        "codepoint": "U+E868",
        "description": "Theme 1"
    },
    "analyticsThemeInversion": {
        "codepoint": "U+E867",
        "description": "Inversion of theme"
    },
    "analyticsThemeRetrograde": {
        "codepoint": "U+E865",
        "description": "Retrograde of theme"
    },
    "analyticsThemeRetrogradeInversion": {
        "codepoint": "U+E866",
        "description": "Retrograde inversion of theme"
    },
    "arpeggiatoDown": {
        "alternateCodepoint": "U+1D184",
        "codepoint": "U+E635",
        "description": "Arpeggiato down"
    },
    "arpeggiatoUp": {
        "alternateCodepoint": "U+1D183",
        "codepoint": "U+E634",
        "description": "Arpeggiato up"
    },
    "arrowBlackDown": {
        "codepoint": "U+EB64",
        "description": "Black arrow down (S)"
    },
    "arrowBlackDownLeft": {
        "codepoint": "U+EB65",
        "description": "Black arrow down-left (SW)"
    },
    "arrowBlackDownRight": {
        "codepoint": "U+EB63",
        "description": "Black arrow down-right (SE)"
    },
    "arrowBlackLeft": {
        "codepoint": "U+EB66",
        "description": "Black arrow left (W)"
    },
    "arrowBlackRight": {
        "codepoint": "U+EB62",
        "description": "Black arrow right (E)"
    },
    "arrowBlackUp": {
        "codepoint": "U+EB60",
        "description": "Black arrow up (N)"
    },
    "arrowBlackUpLeft": {
        "codepoint": "U+EB67",
        "description": "Black arrow up-left (NW)"
    },
    "arrowBlackUpRight": {
        "codepoint": "U+EB61",
        "description": "Black arrow up-right (NE)"
    },
    "arrowOpenDown": {
        "codepoint": "U+EB74",
        "description": "Open arrow down (S)"
    },
    "arrowOpenDownLeft": {
        "codepoint": "U+EB75",
        "description": "Open arrow down-left (SW)"
    },
    "arrowOpenDownRight": {
        "codepoint": "U+EB73",
        "description": "Open arrow down-right (SE)"
    },
    "arrowOpenLeft": {
        "codepoint": "U+EB76",
        "description": "Open arrow left (W)"
    },
    "arrowOpenRight": {
        "codepoint": "U+EB72",
        "description": "Open arrow right (E)"
    },
    "arrowOpenUp": {
        "codepoint": "U+EB70",
        "description": "Open arrow up (N)"
    },
    "arrowOpenUpLeft": {
        "codepoint": "U+EB77",
        "description": "Open arrow up-left (NW)"
    },
    "arrowOpenUpRight": {
        "codepoint": "U+EB71",
        "description": "Open arrow up-right (NE)"
    },
    "arrowWhiteDown": {
        "codepoint": "U+EB6C",
        "description": "White arrow down (S)"
    },
    "arrowWhiteDownLeft": {
        "codepoint": "U+EB6D",
        "description": "White arrow down-left (SW)"
    },
    "arrowWhiteDownRight": {
        "codepoint": "U+EB6B",
        "description": "White arrow down-right (SE)"
    },
    "arrowWhiteLeft": {
        "codepoint": "U+EB6E",
        "description": "White arrow left (W)"
    },
    "arrowWhiteRight": {
        "codepoint": "U+EB6A",
        "description": "White arrow right (E)"
    },
    "arrowWhiteUp": {
        "codepoint": "U+EB68",
        "description": "White arrow up (N)"
    },
    "arrowWhiteUpLeft": {
        "codepoint": "U+EB6F",
        "description": "White arrow up-left (NW)"
    },
    "arrowWhiteUpRight": {
        "codepoint": "U+EB69",
        "description": "White arrow up-right (NE)"
    },
    "arrowheadBlackDown": {
        "codepoint": "U+EB7C",
        "description": "Black arrowhead down (S)"
    },
    "arrowheadBlackDownLeft": {
        "codepoint": "U+EB7D",
        "description": "Black arrowhead down-left (SW)"
    },
    "arrowheadBlackDownRight": {
        "codepoint": "U+EB7B",
        "description": "Black arrowhead down-right (SE)"
    },
    "arrowheadBlackLeft": {
        "codepoint": "U+EB7E",
        "description": "Black arrowhead left (W)"
    },
    "arrowheadBlackRight": {
        "codepoint": "U+EB7A",
        "description": "Black arrowhead right (E)"
    },
    "arrowheadBlackUp": {
        "codepoint": "U+EB78",
        "description": "Black arrowhead up (N)"
    },
    "arrowheadBlackUpLeft": {
        "codepoint": "U+EB7F",
        "description": "Black arrowhead up-left (NW)"
    },
    "arrowheadBlackUpRight": {
        "codepoint": "U+EB79",
        "description": "Black arrowhead up-right (NE)"
    },
    "arrowheadOpenDown": {
        "codepoint": "U+EB8C",
        "description": "Open arrowhead down (S)"
    },
    "arrowheadOpenDownLeft": {
        "codepoint": "U+EB8D",
        "description": "Open arrowhead down-left (SW)"
    },
    "arrowheadOpenDownRight": {
        "codepoint": "U+EB8B",
        "description": "Open arrowhead down-right (SE)"
    },
    "arrowheadOpenLeft": {
        "codepoint": "U+EB8E",
        "description": "Open arrowhead left (W)"
    },
    "arrowheadOpenRight": {
        "codepoint": "U+EB8A",
        "description": "Open arrowhead right (E)"
    },
    "arrowheadOpenUp": {
        "codepoint": "U+EB88",
        "description": "Open arrowhead up (N)"
    },
    "arrowheadOpenUpLeft": {
        "codepoint": "U+EB8F",
        "description": "Open arrowhead up-left (NW)"
    },
    "arrowheadOpenUpRight": {
        "codepoint": "U+EB89",
        "description": "Open arrowhead up-right (NE)"
    },
    "arrowheadWhiteDown": {
        "codepoint": "U+EB84",
        "description": "White arrowhead down (S)"
    },
    "arrowheadWhiteDownLeft": {
        "codepoint": "U+EB85",
        "description": "White arrowhead down-left (SW)"
    },
    "arrowheadWhiteDownRight": {
        "codepoint": "U+EB83",
        "description": "White arrowhead down-right (SE)"
    },
    "arrowheadWhiteLeft": {
        "codepoint": "U+EB86",
        "description": "White arrowhead left (W)"
    },
    "arrowheadWhiteRight": {
        "codepoint": "U+EB82",
        "description": "White arrowhead right (E)"
    },
    "arrowheadWhiteUp": {
        "codepoint": "U+EB80",
        "description": "White arrowhead up (N)"
    },
    "arrowheadWhiteUpLeft": {
        "codepoint": "U+EB87",
        "description": "White arrowhead up-left (NW)"
    },
    "arrowheadWhiteUpRight": {
        "codepoint": "U+EB81",
        "description": "White arrowhead up-right (NE)"
    },
    "articAccentAbove": {
        "alternateCodepoint": "U+1D17B",
        "codepoint": "U+E4A0",
        "description": "Accent above"
    },
    "articAccentBelow": {
        "codepoint": "U+E4A1",
        "description": "Accent below"
    },
    "articAccentStaccatoAbove": {
        "alternateCodepoint": "U+1D181",
        "codepoint": "U+E4B0",
        "description": "Accent-staccato above"
    },
    "articAccentStaccatoBelow": {
        "codepoint": "U+E4B1",
        "description": "Accent-staccato below"
    },
    "articLaissezVibrerAbove": {
        "codepoint": "U+E4BA",
        "description": "Laissez vibrer (l.v.) above"
    },
    "articLaissezVibrerBelow": {
        "codepoint": "U+E4BB",
        "description": "Laissez vibrer (l.v.) below"
    },
    "articMarcatoAbove": {
        "alternateCodepoint": "U+1D17F",
        "codepoint": "U+E4AC",
        "description": "Marcato above"
    },
    "articMarcatoBelow": {
        "codepoint": "U+E4AD",
        "description": "Marcato below"
    },
    "articMarcatoStaccatoAbove": {
        "alternateCodepoint": "U+1D180",
        "codepoint": "U+E4AE",
        "description": "Marcato-staccato above"
    },
    "articMarcatoStaccatoBelow": {
        "codepoint": "U+E4AF",
        "description": "Marcato-staccato below"
    },
    "articMarcatoTenutoAbove": {
        "codepoint": "U+E4BC",
        "description": "Marcato-tenuto above"
    },
    "articMarcatoTenutoBelow": {
        "codepoint": "U+E4BD",
        "description": "Marcato-tenuto below"
    },
    "articSoftAccentAbove": {
        "codepoint": "U+ED40",
        "description": "Soft accent above"
    },
    "articSoftAccentBelow": {
        "codepoint": "U+ED41",
        "description": "Soft accent below"
    },
    "articSoftAccentStaccatoAbove": {
        "codepoint": "U+ED42",
        "description": "Soft accent-staccato above"
    },
    "articSoftAccentStaccatoBelow": {
        "codepoint": "U+ED43",
        "description": "Soft accent-staccato below"
    },
    "articSoftAccentTenutoAbove": {
        "codepoint": "U+ED44",
        "description": "Soft accent-tenuto above"
    },
    "articSoftAccentTenutoBelow": {
        "codepoint": "U+ED45",
        "description": "Soft accent-tenuto below"
    },
    "articSoftAccentTenutoStaccatoAbove": {
        "codepoint": "U+ED46",
        "description": "Soft accent-tenuto-staccato above"
    },
    "articSoftAccentTenutoStaccatoBelow": {
        "codepoint": "U+ED47",
        "description": "Soft accent-tenuto-staccato below"
    },
    "articStaccatissimoAbove": {
        "alternateCodepoint": "U+1D17E",
        "codepoint": "U+E4A6",
        "description": "Staccatissimo above"
    },
    "articStaccatissimoBelow": {
        "codepoint": "U+E4A7",
        "description": "Staccatissimo below"
    },
    "articStaccatissimoStrokeAbove": {
        "codepoint": "U+E4AA",
        "description": "Staccatissimo stroke above"
    },
    "articStaccatissimoStrokeBelow": {
        "codepoint": "U+E4AB",
        "description": "Staccatissimo stroke below"
    },
    "articStaccatissimoWedgeAbove": {
        "codepoint": "U+E4A8",
        "description": "Staccatissimo wedge above"
    },
    "articStaccatissimoWedgeBelow": {
        "codepoint": "U+E4A9",
        "description": "Staccatissimo wedge below"
    },
    "articStaccatoAbove": {
        "alternateCodepoint": "U+1D17C",
        "codepoint": "U+E4A2",
        "description": "Staccato above"
    },
    "articStaccatoBelow": {
        "codepoint": "U+E4A3",
        "description": "Staccato below"
    },
    "articStressAbove": {
        "codepoint": "U+E4B6",
        "description": "Stress above"
    },
    "articStressBelow": {
        "codepoint": "U+E4B7",
        "description": "Stress below"
    },
    "articTenutoAbove": {
        "alternateCodepoint": "U+1D17D",
        "codepoint": "U+E4A4",
        "description": "Tenuto above"
    },
    "articTenutoAccentAbove": {
        "codepoint": "U+E4B4",
        "description": "Tenuto-accent above"
    },
    "articTenutoAccentBelow": {
        "codepoint": "U+E4B5",
        "description": "Tenuto-accent below"
    },
    "articTenutoBelow": {
        "codepoint": "U+E4A5",
        "description": "Tenuto below"
    },
    "articTenutoStaccatoAbove": {
        "alternateCodepoint": "U+1D182",
        "codepoint": "U+E4B2",
        "description": "Lour\u00e9 (tenuto-staccato) above"
    },
    "articTenutoStaccatoBelow": {
        "codepoint": "U+E4B3",
        "description": "Lour\u00e9 (tenuto-staccato) below"
    },
    "articUnstressAbove": {
        "codepoint": "U+E4B8",
        "description": "Unstress above"
    },
    "articUnstressBelow": {
        "codepoint": "U+E4B9",
        "description": "Unstress below"
    },
    "augmentationDot": {
        "alternateCodepoint": "U+1D16D",
        "codepoint": "U+E1E7",
        "description": "Augmentation dot"
    },
    "barlineDashed": {
        "alternateCodepoint": "U+1D104",
        "codepoint": "U+E036",
        "description": "Dashed barline"
    },
    "barlineDotted": {
        "codepoint": "U+E037",
        "description": "Dotted barline"
    },
    "barlineDouble": {
        "alternateCodepoint": "U+1D101",
        "codepoint": "U+E031",
        "description": "Double barline"
    },
    "barlineFinal": {
        "alternateCodepoint": "U+1D102",
        "codepoint": "U+E032",
        "description": "Final barline"
    },
    "barlineHeavy": {
        "codepoint": "U+E034",
        "description": "Heavy barline"
    },
    "barlineHeavyHeavy": {
        "codepoint": "U+E035",
        "description": "Heavy double barline"
    },
    "barlineReverseFinal": {
        "alternateCodepoint": "U+1D103",
        "codepoint": "U+E033",
        "description": "Reverse final barline"
    },
    "barlineShort": {
        "alternateCodepoint": "U+1D105",
        "codepoint": "U+E038",
        "description": "Short barline"
    },
    "barlineSingle": {
        "alternateCodepoint": "U+1D100",
        "codepoint": "U+E030",
        "description": "Single barline"
    },
    "barlineTick": {
        "codepoint": "U+E039",
        "description": "Tick barline"
    },
    "beamAccelRit1": {
        "codepoint": "U+EAF4",
        "description": "Accel./rit. beam 1 (widest)"
    },
    "beamAccelRit10": {
        "codepoint": "U+EAFD",
        "description": "Accel./rit. beam 10"
    },
    "beamAccelRit11": {
        "codepoint": "U+EAFE",
        "description": "Accel./rit. beam 11"
    },
    "beamAccelRit12": {
        "codepoint": "U+EAFF",
        "description": "Accel./rit. beam 12"
    },
    "beamAccelRit13": {
        "codepoint": "U+EB00",
        "description": "Accel./rit. beam 13"
    },
    "beamAccelRit14": {
        "codepoint": "U+EB01",
        "description": "Accel./rit. beam 14"
    },
    "beamAccelRit15": {
        "codepoint": "U+EB02",
        "description": "Accel./rit. beam 15 (narrowest)"
    },
    "beamAccelRit2": {
        "codepoint": "U+EAF5",
        "description": "Accel./rit. beam 2"
    },
    "beamAccelRit3": {
        "codepoint": "U+EAF6",
        "description": "Accel./rit. beam 3"
    },
    "beamAccelRit4": {
        "codepoint": "U+EAF7",
        "description": "Accel./rit. beam 4"
    },
    "beamAccelRit5": {
        "codepoint": "U+EAF8",
        "description": "Accel./rit. beam 5"
    },
    "beamAccelRit6": {
        "codepoint": "U+EAF9",
        "description": "Accel./rit. beam 6"
    },
    "beamAccelRit7": {
        "codepoint": "U+EAFA",
        "description": "Accel./rit. beam 7"
    },
    "beamAccelRit8": {
        "codepoint": "U+EAFB",
        "description": "Accel./rit. beam 8"
    },
    "beamAccelRit9": {
        "codepoint": "U+EAFC",
        "description": "Accel./rit. beam 9"
    },
    "beamAccelRitFinal": {
        "codepoint": "U+EB03",
        "description": "Accel./rit. beam terminating line"
    },
    "brace": {
        "alternateCodepoint": "U+1D114",
        "codepoint": "U+E000",
        "description": "Brace"
    },
    "bracket": {
        "alternateCodepoint": "U+1D115",
        "codepoint": "U+E002",
        "description": "Bracket"
    },
    "bracketBottom": {
        "codepoint": "U+E004",
        "description": "Bracket bottom"
    },
    "bracketTop": {
        "codepoint": "U+E003",
        "description": "Bracket top"
    },
    "brassBend": {
        "alternateCodepoint": "U+1D189",
        "codepoint": "U+E5E3",
        "description": "Bend"
    },
    "brassDoitLong": {
        "codepoint": "U+E5D6",
        "description": "Doit, long"
    },
    "brassDoitMedium": {
        "codepoint": "U+E5D5",
        "description": "Doit, medium"
    },
    "brassDoitShort": {
        "alternateCodepoint": "U+1D185",
        "codepoint": "U+E5D4",
        "description": "Doit, short"
    },
    "brassFallLipLong": {
        "codepoint": "U+E5D9",
        "description": "Lip fall, long"
    },
    "brassFallLipMedium": {
        "codepoint": "U+E5D8",
        "description": "Lip fall, medium"
    },
    "brassFallLipShort": {
        "alternateCodepoint": "U+1D186",
        "codepoint": "U+E5D7",
        "description": "Lip fall, short"
    },
    "brassFallRoughLong": {
        "codepoint": "U+E5DF",
        "description": "Rough fall, long"
    },
    "brassFallRoughMedium": {
        "codepoint": "U+E5DE",
        "description": "Rough fall, medium"
    },
    "brassFallRoughShort": {
        "codepoint": "U+E5DD",
        "description": "Rough fall, short"
    },
    "brassFallSmoothLong": {
        "codepoint": "U+E5DC",
        "description": "Smooth fall, long"
    },
    "brassFallSmoothMedium": {
        "codepoint": "U+E5DB",
        "description": "Smooth fall, medium"
    },
    "brassFallSmoothShort": {
        "codepoint": "U+E5DA",
        "description": "Smooth fall, short"
    },
    "brassFlip": {
        "alternateCodepoint": "U+1D187",
        "codepoint": "U+E5E1",
        "description": "Flip"
    },
    "brassHarmonMuteClosed": {
        "codepoint": "U+E5E8",
        "description": "Harmon mute, stem in"
    },
    "brassHarmonMuteStemHalfLeft": {
        "codepoint": "U+E5E9",
        "description": "Harmon mute, stem extended, left"
    },
    "brassHarmonMuteStemHalfRight": {
        "codepoint": "U+E5EA",
        "description": "Harmon mute, stem extended, right"
    },
    "brassHarmonMuteStemOpen": {
        "codepoint": "U+E5EB",
        "description": "Harmon mute, stem out"
    },
    "brassJazzTurn": {
        "codepoint": "U+E5E4",
        "description": "Jazz turn"
    },
    "brassLiftLong": {
        "codepoint": "U+E5D3",
        "description": "Lift, long"
    },
    "brassLiftMedium": {
        "codepoint": "U+E5D2",
        "description": "Lift, medium"
    },
    "brassLiftShort": {
        "codepoint": "U+E5D1",
        "description": "Lift, short"
    },
    "brassLiftSmoothLong": {
        "codepoint": "U+E5EE",
        "description": "Smooth lift, long"
    },
    "brassLiftSmoothMedium": {
        "codepoint": "U+E5ED",
        "description": "Smooth lift, medium"
    },
    "brassLiftSmoothShort": {
        "codepoint": "U+E5EC",
        "description": "Smooth lift, short"
    },
    "brassMuteClosed": {
        "codepoint": "U+E5E5",
        "description": "Muted (closed)"
    },
    "brassMuteHalfClosed": {
        "codepoint": "U+E5E6",
        "description": "Half-muted (half-closed)"
    },
    "brassMuteOpen": {
        "codepoint": "U+E5E7",
        "description": "Open"
    },
    "brassPlop": {
        "codepoint": "U+E5E0",
        "description": "Plop"
    },
    "brassScoop": {
        "codepoint": "U+E5D0",
        "description": "Scoop"
    },
    "brassSmear": {
        "alternateCodepoint": "U+1D188",
        "codepoint": "U+E5E2",
        "description": "Smear"
    },
    "brassValveTrill": {
        "codepoint": "U+E5EF",
        "description": "Valve trill"
    },
    "breathMarkComma": {
        "alternateCodepoint": "U+1D112",
        "codepoint": "U+E4CE",
        "description": "Breath mark (comma)"
    },
    "breathMarkSalzedo": {
        "codepoint": "U+E4D5",
        "description": "Breath mark (Salzedo)"
    },
    "breathMarkTick": {
        "codepoint": "U+E4CF",
        "description": "Breath mark (tick-like)"
    },
    "breathMarkUpbow": {
        "codepoint": "U+E4D0",
        "description": "Breath mark (upbow-like)"
    },
    "bridgeClef": {
        "codepoint": "U+E078",
        "description": "Bridge clef"
    },
    "buzzRoll": {
        "codepoint": "U+E22A",
        "description": "Buzz roll"
    },
    "cClef": {
        "alternateCodepoint": "U+1D121",
        "codepoint": "U+E05C",
        "description": "C clef"
    },
    "cClef8vb": {
        "codepoint": "U+E05D",
        "description": "C clef ottava bassa"
    },
    "cClefArrowDown": {
        "codepoint": "U+E05F",
        "description": "C clef, arrow down"
    },
    "cClefArrowUp": {
        "codepoint": "U+E05E",
        "description": "C clef, arrow up"
    },
    "cClefChange": {
        "codepoint": "U+E07B",
        "description": "C clef change"
    },
    "cClefCombining": {
        "codepoint": "U+E061",
        "description": "Combining C clef"
    },
    "cClefReversed": {
        "codepoint": "U+E075",
        "description": "Reversed C clef"
    },
    "cClefSquare": {
        "codepoint": "U+E060",
        "description": "C clef (19th century)"
    },
    "caesura": {
        "alternateCodepoint": "U+1D113",
        "codepoint": "U+E4D1",
        "description": "Caesura"
    },
    "caesuraCurved": {
        "codepoint": "U+E4D4",
        "description": "Curved caesura"
    },
    "caesuraShort": {
        "codepoint": "U+E4D3",
        "description": "Short caesura"
    },
    "caesuraThick": {
        "codepoint": "U+E4D2",
        "description": "Thick caesura"
    },
    "chantAccentusAbove": {
        "codepoint": "U+E9D6",
        "description": "Accentus above"
    },
    "chantAccentusBelow": {
        "codepoint": "U+E9D7",
        "description": "Accentus below"
    },
    "chantAuctumAsc": {
        "codepoint": "U+E994",
        "description": "Punctum auctum, ascending"
    },
    "chantAuctumDesc": {
        "codepoint": "U+E995",
        "description": "Punctum auctum, descending"
    },
    "chantAugmentum": {
        "codepoint": "U+E9D9",
        "description": "Augmentum (mora)"
    },
    "chantCaesura": {
        "codepoint": "U+E8F8",
        "description": "Caesura"
    },
    "chantCclef": {
        "alternateCodepoint": "U+1D1D0",
        "codepoint": "U+E906",
        "description": "Plainchant C clef"
    },
    "chantCirculusAbove": {
        "codepoint": "U+E9D2",
        "description": "Circulus above"
    },
    "chantCirculusBelow": {
        "codepoint": "U+E9D3",
        "description": "Circulus below"
    },
    "chantConnectingLineAsc2nd": {
        "codepoint": "U+E9BD",
        "description": "Connecting line, ascending 2nd"
    },
    "chantConnectingLineAsc3rd": {
        "codepoint": "U+E9BE",
        "description": "Connecting line, ascending 3rd"
    },
    "chantConnectingLineAsc4th": {
        "codepoint": "U+E9BF",
        "description": "Connecting line, ascending 4th"
    },
    "chantConnectingLineAsc5th": {
        "codepoint": "U+E9C0",
        "description": "Connecting line, ascending 5th"
    },
    "chantConnectingLineAsc6th": {
        "codepoint": "U+E9C1",
        "description": "Connecting line, ascending 6th"
    },
    "chantCustosStemDownPosHigh": {
        "codepoint": "U+EA08",
        "description": "Plainchant custos, stem down, high position"
    },
    "chantCustosStemDownPosHighest": {
        "codepoint": "U+EA09",
        "description": "Plainchant custos, stem down, highest position"
    },
    "chantCustosStemDownPosMiddle": {
        "codepoint": "U+EA07",
        "description": "Plainchant custos, stem down, middle position"
    },
    "chantCustosStemUpPosLow": {
        "codepoint": "U+EA05",
        "description": "Plainchant custos, stem up, low position"
    },
    "chantCustosStemUpPosLowest": {
        "codepoint": "U+EA04",
        "description": "Plainchant custos, stem up, lowest position"
    },
    "chantCustosStemUpPosMiddle": {
        "codepoint": "U+EA06",
        "description": "Plainchant custos, stem up, middle position"
    },
    "chantDeminutumLower": {
        "codepoint": "U+E9B3",
        "description": "Punctum deminutum, lower"
    },
    "chantDeminutumUpper": {
        "codepoint": "U+E9B2",
        "description": "Punctum deminutum, upper"
    },
    "chantDivisioFinalis": {
        "codepoint": "U+E8F6",
        "description": "Divisio finalis"
    },
    "chantDivisioMaior": {
        "codepoint": "U+E8F4",
        "description": "Divisio maior"
    },
    "chantDivisioMaxima": {
        "codepoint": "U+E8F5",
        "description": "Divisio maxima"
    },
    "chantDivisioMinima": {
        "codepoint": "U+E8F3",
        "description": "Divisio minima"
    },
    "chantEntryLineAsc2nd": {
        "codepoint": "U+E9B4",
        "description": "Entry line, ascending 2nd"
    },
    "chantEntryLineAsc3rd": {
        "codepoint": "U+E9B5",
        "description": "Entry line, ascending 3rd"
    },
    "chantEntryLineAsc4th": {
        "codepoint": "U+E9B6",
        "description": "Entry line, ascending 4th"
    },
    "chantEntryLineAsc5th": {
        "codepoint": "U+E9B7",
        "description": "Entry line, ascending 5th"
    },
    "chantEntryLineAsc6th": {
        "codepoint": "U+E9B8",
        "description": "Entry line, ascending 6th"
    },
    "chantEpisema": {
        "codepoint": "U+E9D8",
        "description": "Episema"
    },
    "chantFclef": {
        "alternateCodepoint": "U+1D1D1",
        "codepoint": "U+E902",
        "description": "Plainchant F clef"
    },
    "chantIctusAbove": {
        "codepoint": "U+E9D0",
        "description": "Ictus above"
    },
    "chantIctusBelow": {
        "codepoint": "U+E9D1",
        "description": "Ictus below"
    },
    "chantLigaturaDesc2nd": {
        "codepoint": "U+E9B9",
        "description": "Ligated stroke, descending 2nd"
    },
    "chantLigaturaDesc3rd": {
        "codepoint": "U+E9BA",
        "description": "Ligated stroke, descending 3rd"
    },
    "chantLigaturaDesc4th": {
        "codepoint": "U+E9BB",
        "description": "Ligated stroke, descending 4th"
    },
    "chantLigaturaDesc5th": {
        "codepoint": "U+E9BC",
        "description": "Ligated stroke, descending 5th"
    },
    "chantOriscusAscending": {
        "codepoint": "U+E99C",
        "description": "Oriscus ascending"
    },
    "chantOriscusDescending": {
        "codepoint": "U+E99D",
        "description": "Oriscus descending"
    },
    "chantOriscusLiquescens": {
        "codepoint": "U+E99E",
        "description": "Oriscus liquescens"
    },
    "chantPodatusLower": {
        "codepoint": "U+E9B0",
        "description": "Podatus, lower"
    },
    "chantPodatusUpper": {
        "alternateCodepoint": "U+1D1D4",
        "codepoint": "U+E9B1",
        "description": "Podatus, upper"
    },
    "chantPunctum": {
        "codepoint": "U+E990",
        "description": "Punctum"
    },
    "chantPunctumCavum": {
        "codepoint": "U+E998",
        "description": "Punctum cavum"
    },
    "chantPunctumDeminutum": {
        "codepoint": "U+E9A1",
        "description": "Punctum deminutum"
    },
    "chantPunctumInclinatum": {
        "codepoint": "U+E991",
        "description": "Punctum inclinatum"
    },
    "chantPunctumInclinatumAuctum": {
        "codepoint": "U+E992",
        "description": "Punctum inclinatum auctum"
    },
    "chantPunctumInclinatumDeminutum": {
        "codepoint": "U+E993",
        "description": "Punctum inclinatum deminutum"
    },
    "chantPunctumLinea": {
        "codepoint": "U+E999",
        "description": "Punctum linea"
    },
    "chantPunctumLineaCavum": {
        "codepoint": "U+E99A",
        "description": "Punctum linea cavum"
    },
    "chantPunctumVirga": {
        "alternateCodepoint": "U+1D1D3",
        "codepoint": "U+E996",
        "description": "Punctum virga"
    },
    "chantPunctumVirgaReversed": {
        "codepoint": "U+E997",
        "description": "Punctum virga, reversed"
    },
    "chantQuilisma": {
        "codepoint": "U+E99B",
        "description": "Quilisma"
    },
    "chantSemicirculusAbove": {
        "codepoint": "U+E9D4",
        "description": "Semicirculus above"
    },
    "chantSemicirculusBelow": {
        "codepoint": "U+E9D5",
        "description": "Semicirculus below"
    },
    "chantStaff": {
        "codepoint": "U+E8F0",
        "description": "Plainchant staff"
    },
    "chantStaffNarrow": {
        "codepoint": "U+E8F2",
        "description": "Plainchant staff (narrow)"
    },
    "chantStaffWide": {
        "codepoint": "U+E8F1",
        "description": "Plainchant staff (wide)"
    },
    "chantStrophicus": {
        "codepoint": "U+E99F",
        "description": "Strophicus"
    },
    "chantStrophicusAuctus": {
        "codepoint": "U+E9A0",
        "description": "Strophicus auctus"
    },
    "chantStrophicusLiquescens2nd": {
        "codepoint": "U+E9C2",
        "description": "Strophicus liquescens, 2nd"
    },
    "chantStrophicusLiquescens3rd": {
        "codepoint": "U+E9C3",
        "description": "Strophicus liquescens, 3rd"
    },
    "chantStrophicusLiquescens4th": {
        "codepoint": "U+E9C4",
        "description": "Strophicus liquescens, 4th"
    },
    "chantStrophicusLiquescens5th": {
        "codepoint": "U+E9C5",
        "description": "Strophicus liquescens, 5th"
    },
    "chantVirgula": {
        "codepoint": "U+E8F7",
        "description": "Virgula"
    },
    "clef15": {
        "codepoint": "U+E07E",
        "description": "15 for clefs"
    },
    "clef8": {
        "codepoint": "U+E07D",
        "description": "8 for clefs"
    },
    "clefChangeCombining": {
        "codepoint": "U+E07F",
        "description": "Combining clef change"
    },
    "coda": {
        "alternateCodepoint": "U+1D10C",
        "codepoint": "U+E048",
        "description": "Coda"
    },
    "codaSquare": {
        "codepoint": "U+E049",
        "description": "Square coda"
    },
    "conductorBeat2Compound": {
        "codepoint": "U+E897",
        "description": "Beat 2, compound time"
    },
    "conductorBeat2Simple": {
        "codepoint": "U+E894",
        "description": "Beat 2, simple time"
    },
    "conductorBeat3Compound": {
        "codepoint": "U+E898",
        "description": "Beat 3, compound time"
    },
    "conductorBeat3Simple": {
        "codepoint": "U+E895",
        "description": "Beat 3, simple time"
    },
    "conductorBeat4Compound": {
        "codepoint": "U+E899",
        "description": "Beat 4, compound time"
    },
    "conductorBeat4Simple": {
        "codepoint": "U+E896",
        "description": "Beat 4, simple time"
    },
    "conductorLeftBeat": {
        "codepoint": "U+E891",
        "description": "Left-hand beat or cue"
    },
    "conductorRightBeat": {
        "codepoint": "U+E892",
        "description": "Right-hand beat or cue"
    },
    "conductorStrongBeat": {
        "codepoint": "U+E890",
        "description": "Strong beat or cue"
    },
    "conductorUnconducted": {
        "codepoint": "U+E89A",
        "description": "Unconducted/free passages"
    },
    "conductorWeakBeat": {
        "codepoint": "U+E893",
        "description": "Weak beat or cue"
    },
    "controlBeginBeam": {
        "alternateCodepoint": "U+1D173",
        "codepoint": "U+E8E0",
        "description": "Begin beam"
    },
    "controlBeginPhrase": {
        "alternateCodepoint": "U+1D179",
        "codepoint": "U+E8E6",
        "description": "Begin phrase"
    },
    "controlBeginSlur": {
        "alternateCodepoint": "U+1D177",
        "codepoint": "U+E8E4",
        "description": "Begin slur"
    },
    "controlBeginTie": {
        "alternateCodepoint": "U+1D175",
        "codepoint": "U+E8E2",
        "description": "Begin tie"
    },
    "controlEndBeam": {
        "alternateCodepoint": "U+1D174",
        "codepoint": "U+E8E1",
        "description": "End beam"
    },
    "controlEndPhrase": {
        "alternateCodepoint": "U+1D17A",
        "codepoint": "U+E8E7",
        "description": "End phrase"
    },
    "controlEndSlur": {
        "alternateCodepoint": "U+1D178",
        "codepoint": "U+E8E5",
        "description": "End slur"
    },
    "controlEndTie": {
        "alternateCodepoint": "U+1D176",
        "codepoint": "U+E8E3",
        "description": "End tie"
    },
    "csymAccidentalDoubleFlat": {
        "codepoint": "U+ED64",
        "description": "Double flat"
    },
    "csymAccidentalDoubleSharp": {
        "codepoint": "U+ED63",
        "description": "Double sharp"
    },
    "csymAccidentalFlat": {
        "codepoint": "U+ED60",
        "description": "Flat"
    },
    "csymAccidentalNatural": {
        "codepoint": "U+ED61",
        "description": "Natural"
    },
    "csymAccidentalSharp": {
        "codepoint": "U+ED62",
        "description": "Sharp"
    },
    "csymAccidentalTripleFlat": {
        "codepoint": "U+ED66",
        "description": "Triple flat"
    },
    "csymAccidentalTripleSharp": {
        "codepoint": "U+ED65",
        "description": "Triple sharp"
    },
    "csymAlteredBassSlash": {
        "codepoint": "U+E87B",
        "description": "Slash for altered bass note"
    },
    "csymAugmented": {
        "codepoint": "U+E872",
        "description": "Augmented"
    },
    "csymBracketLeftTall": {
        "codepoint": "U+E877",
        "description": "Double-height left bracket"
    },
    "csymBracketRightTall": {
        "codepoint": "U+E878",
        "description": "Double-height right bracket"
    },
    "csymDiagonalArrangementSlash": {
        "codepoint": "U+E87C",
        "description": "Slash for chord symbols arranged diagonally"
    },
    "csymDiminished": {
        "alternateCodepoint": "U+1D1A9",
        "codepoint": "U+E870",
        "description": "Diminished"
    },
    "csymHalfDiminished": {
        "codepoint": "U+E871",
        "description": "Half-diminished"
    },
    "csymMajorSeventh": {
        "codepoint": "U+E873",
        "description": "Major seventh"
    },
    "csymMinor": {
        "codepoint": "U+E874",
        "description": "Minor"
    },
    "csymParensLeftTall": {
        "codepoint": "U+E875",
        "description": "Double-height left parenthesis"
    },
    "csymParensLeftVeryTall": {
        "codepoint": "U+E879",
        "description": "Triple-height left parenthesis"
    },
    "csymParensRightTall": {
        "codepoint": "U+E876",
        "description": "Double-height right parenthesis"
    },
    "csymParensRightVeryTall": {
        "codepoint": "U+E87A",
        "description": "Triple-height right parenthesis"
    },
    "curlewSign": {
        "codepoint": "U+E4D6",
        "description": "Curlew (Britten)"
    },
    "daCapo": {
        "alternateCodepoint": "U+1D10A",
        "codepoint": "U+E046",
        "description": "Da capo"
    },
    "dalSegno": {
        "alternateCodepoint": "U+1D109",
        "codepoint": "U+E045",
        "description": "Dal segno"
    },
    "daseianExcellentes1": {
        "codepoint": "U+EA3C",
        "description": "Daseian excellentes 1"
    },
    "daseianExcellentes2": {
        "codepoint": "U+EA3D",
        "description": "Daseian excellentes 2"
    },
    "daseianExcellentes3": {
        "codepoint": "U+EA3E",
        "description": "Daseian excellentes 3"
    },
    "daseianExcellentes4": {
        "codepoint": "U+EA3F",
        "description": "Daseian excellentes 4"
    },
    "daseianFinales1": {
        "codepoint": "U+EA34",
        "description": "Daseian finales 1"
    },
    "daseianFinales2": {
        "codepoint": "U+EA35",
        "description": "Daseian finales 2"
    },
    "daseianFinales3": {
        "codepoint": "U+EA36",
        "description": "Daseian finales 3"
    },
    "daseianFinales4": {
        "codepoint": "U+EA37",
        "description": "Daseian finales 4"
    },
    "daseianGraves1": {
        "codepoint": "U+EA30",
        "description": "Daseian graves 1"
    },
    "daseianGraves2": {
        "codepoint": "U+EA31",
        "description": "Daseian graves 2"
    },
    "daseianGraves3": {
        "codepoint": "U+EA32",
        "description": "Daseian graves 3"
    },
    "daseianGraves4": {
        "codepoint": "U+EA33",
        "description": "Daseian graves 4"
    },
    "daseianResidua1": {
        "codepoint": "U+EA40",
        "description": "Daseian residua 1"
    },
    "daseianResidua2": {
        "codepoint": "U+EA41",
        "description": "Daseian residua 2"
    },
    "daseianSuperiores1": {
        "codepoint": "U+EA38",
        "description": "Daseian superiores 1"
    },
    "daseianSuperiores2": {
        "codepoint": "U+EA39",
        "description": "Daseian superiores 2"
    },
    "daseianSuperiores3": {
        "codepoint": "U+EA3A",
        "description": "Daseian superiores 3"
    },
    "daseianSuperiores4": {
        "codepoint": "U+EA3B",
        "description": "Daseian superiores 4"
    },
    "doubleLateralRollStevens": {
        "codepoint": "U+E234",
        "description": "Double lateral roll (Stevens)"
    },
    "doubleTongueAbove": {
        "alternateCodepoint": "U+1D18A",
        "codepoint": "U+E5F0",
        "description": "Double-tongue above"
    },
    "doubleTongueBelow": {
        "codepoint": "U+E5F1",
        "description": "Double-tongue below"
    },
    "dynamicCombinedSeparatorColon": {
        "codepoint": "U+E546",
        "description": "Colon separator for combined dynamics"
    },
    "dynamicCombinedSeparatorHyphen": {
        "codepoint": "U+E547",
        "description": "Hyphen separator for combined dynamics"
    },
    "dynamicCombinedSeparatorSlash": {
        "codepoint": "U+E549",
        "description": "Slash separator for combined dynamics"
    },
    "dynamicCombinedSeparatorSpace": {
        "codepoint": "U+E548",
        "description": "Space separator for combined dynamics"
    },
    "dynamicCrescendoHairpin": {
        "alternateCodepoint": "U+1D192",
        "codepoint": "U+E53E",
        "description": "Crescendo"
    },
    "dynamicDiminuendoHairpin": {
        "alternateCodepoint": "U+1D193",
        "codepoint": "U+E53F",
        "description": "Diminuendo"
    },
    "dynamicFF": {
        "codepoint": "U+E52F",
        "description": "ff"
    },
    "dynamicFFF": {
        "codepoint": "U+E530",
        "description": "fff"
    },
    "dynamicFFFF": {
        "codepoint": "U+E531",
        "description": "ffff"
    },
    "dynamicFFFFF": {
        "codepoint": "U+E532",
        "description": "fffff"
    },
    "dynamicFFFFFF": {
        "codepoint": "U+E533",
        "description": "ffffff"
    },
    "dynamicForte": {
        "alternateCodepoint": "U+1D191",
        "codepoint": "U+E522",
        "description": "Forte"
    },
    "dynamicFortePiano": {
        "codepoint": "U+E534",
        "description": "Forte-piano"
    },
    "dynamicForzando": {
        "codepoint": "U+E535",
        "description": "Forzando"
    },
    "dynamicHairpinBracketLeft": {
        "codepoint": "U+E544",
        "description": "Left bracket (for hairpins)"
    },
    "dynamicHairpinBracketRight": {
        "codepoint": "U+E545",
        "description": "Right bracket (for hairpins)"
    },
    "dynamicHairpinParenthesisLeft": {
        "codepoint": "U+E542",
        "description": "Left parenthesis (for hairpins)"
    },
    "dynamicHairpinParenthesisRight": {
        "codepoint": "U+E543",
        "description": "Right parenthesis (for hairpins)"
    },
    "dynamicMF": {
        "codepoint": "U+E52D",
        "description": "mf"
    },
    "dynamicMP": {
        "codepoint": "U+E52C",
        "description": "mp"
    },
    "dynamicMessaDiVoce": {
        "codepoint": "U+E540",
        "description": "Messa di voce"
    },
    "dynamicMezzo": {
        "alternateCodepoint": "U+1D190",
        "codepoint": "U+E521",
        "description": "Mezzo"
    },
    "dynamicNiente": {
        "codepoint": "U+E526",
        "description": "Niente"
    },
    "dynamicNienteForHairpin": {
        "codepoint": "U+E541",
        "description": "Niente (for hairpins)"
    },
    "dynamicPF": {
        "codepoint": "U+E52E",
        "description": "pf"
    },
    "dynamicPP": {
        "codepoint": "U+E52B",
        "description": "pp"
    },
    "dynamicPPP": {
        "codepoint": "U+E52A",
        "description": "ppp"
    },
    "dynamicPPPP": {
        "codepoint": "U+E529",
        "description": "pppp"
    },
    "dynamicPPPPP": {
        "codepoint": "U+E528",
        "description": "ppppp"
    },
    "dynamicPPPPPP": {
        "codepoint": "U+E527",
        "description": "pppppp"
    },
    "dynamicPiano": {
        "alternateCodepoint": "U+1D18F",
        "codepoint": "U+E520",
        "description": "Piano"
    },
    "dynamicRinforzando": {
        "alternateCodepoint": "U+1D18C",
        "codepoint": "U+E523",
        "description": "Rinforzando"
    },
    "dynamicRinforzando1": {
        "codepoint": "U+E53C",
        "description": "Rinforzando 1"
    },
    "dynamicRinforzando2": {
        "codepoint": "U+E53D",
        "description": "Rinforzando 2"
    },
    "dynamicSforzando": {
        "alternateCodepoint": "U+1D18D",
        "codepoint": "U+E524",
        "description": "Sforzando"
    },
    "dynamicSforzando1": {
        "codepoint": "U+E536",
        "description": "Sforzando 1"
    },
    "dynamicSforzandoPianissimo": {
        "codepoint": "U+E538",
        "description": "Sforzando-pianissimo"
    },
    "dynamicSforzandoPiano": {
        "codepoint": "U+E537",
        "description": "Sforzando-piano"
    },
    "dynamicSforzato": {
        "codepoint": "U+E539",
        "description": "Sforzato"
    },
    "dynamicSforzatoFF": {
        "codepoint": "U+E53B",
        "description": "Sforzatissimo"
    },
    "dynamicSforzatoPiano": {
        "codepoint": "U+E53A",
        "description": "Sforzato-piano"
    },
    "dynamicZ": {
        "alternateCodepoint": "U+1D18E",
        "codepoint": "U+E525",
        "description": "Z"
    },
    "elecAudioChannelsEight": {
        "codepoint": "U+EB46",
        "description": "Eight channels (7.1 surround)"
    },
    "elecAudioChannelsFive": {
        "codepoint": "U+EB43",
        "description": "Five channels"
    },
    "elecAudioChannelsFour": {
        "codepoint": "U+EB42",
        "description": "Four channels"
    },
    "elecAudioChannelsOne": {
        "codepoint": "U+EB3E",
        "description": "One channel (mono)"
    },
    "elecAudioChannelsSeven": {
        "codepoint": "U+EB45",
        "description": "Seven channels"
    },
    "elecAudioChannelsSix": {
        "codepoint": "U+EB44",
        "description": "Six channels (5.1 surround)"
    },
    "elecAudioChannelsThreeFrontal": {
        "codepoint": "U+EB40",
        "description": "Three channels (frontal)"
    },
    "elecAudioChannelsThreeSurround": {
        "codepoint": "U+EB41",
        "description": "Three channels (surround)"
    },
    "elecAudioChannelsTwo": {
        "codepoint": "U+EB3F",
        "description": "Two channels (stereo)"
    },
    "elecAudioIn": {
        "codepoint": "U+EB49",
        "description": "Audio in"
    },
    "elecAudioMono": {
        "codepoint": "U+EB3C",
        "description": "Mono audio setup"
    },
    "elecAudioOut": {
        "codepoint": "U+EB4A",
        "description": "Audio out"
    },
    "elecAudioStereo": {
        "codepoint": "U+EB3D",
        "description": "Stereo audio setup"
    },
    "elecCamera": {
        "codepoint": "U+EB1B",
        "description": "Camera"
    },
    "elecDataIn": {
        "codepoint": "U+EB4D",
        "description": "Data in"
    },
    "elecDataOut": {
        "codepoint": "U+EB4E",
        "description": "Data out"
    },
    "elecDisc": {
        "codepoint": "U+EB13",
        "description": "Disc"
    },
    "elecDownload": {
        "codepoint": "U+EB4F",
        "description": "Download"
    },
    "elecEject": {
        "codepoint": "U+EB2B",
        "description": "Eject"
    },
    "elecFastForward": {
        "codepoint": "U+EB1F",
        "description": "Fast-forward"
    },
    "elecHeadphones": {
        "codepoint": "U+EB11",
        "description": "Headphones"
    },
    "elecHeadset": {
        "codepoint": "U+EB12",
        "description": "Headset"
    },
    "elecLineIn": {
        "codepoint": "U+EB47",
        "description": "Line in"
    },
    "elecLineOut": {
        "codepoint": "U+EB48",
        "description": "Line out"
    },
    "elecLoop": {
        "codepoint": "U+EB23",
        "description": "Loop"
    },
    "elecLoudspeaker": {
        "codepoint": "U+EB1A",
        "description": "Loudspeaker"
    },
    "elecMIDIController0": {
        "codepoint": "U+EB36",
        "description": "MIDI controller 0%"
    },
    "elecMIDIController100": {
        "codepoint": "U+EB3B",
        "description": "MIDI controller 100%"
    },
    "elecMIDIController20": {
        "codepoint": "U+EB37",
        "description": "MIDI controller 20%"
    },
    "elecMIDIController40": {
        "codepoint": "U+EB38",
        "description": "MIDI controller 40%"
    },
    "elecMIDIController60": {
        "codepoint": "U+EB39",
        "description": "MIDI controller 60%"
    },
    "elecMIDIController80": {
        "codepoint": "U+EB3A",
        "description": "MIDI controller 80%"
    },
    "elecMIDIIn": {
        "codepoint": "U+EB34",
        "description": "MIDI in"
    },
    "elecMIDIOut": {
        "codepoint": "U+EB35",
        "description": "MIDI out"
    },
    "elecMicrophone": {
        "codepoint": "U+EB10",
        "description": "Microphone"
    },
    "elecMicrophoneMute": {
        "codepoint": "U+EB28",
        "description": "Mute microphone"
    },
    "elecMicrophoneUnmute": {
        "codepoint": "U+EB29",
        "description": "Unmute microphone"
    },
    "elecMixingConsole": {
        "codepoint": "U+EB15",
        "description": "Mixing console"
    },
    "elecMonitor": {
        "codepoint": "U+EB18",
        "description": "Monitor"
    },
    "elecMute": {
        "codepoint": "U+EB26",
        "description": "Mute"
    },
    "elecPause": {
        "codepoint": "U+EB1E",
        "description": "Pause"
    },
    "elecPlay": {
        "codepoint": "U+EB1C",
        "description": "Play"
    },
    "elecPowerOnOff": {
        "codepoint": "U+EB2A",
        "description": "Power on/off"
    },
    "elecProjector": {
        "codepoint": "U+EB19",
        "description": "Projector"
    },
    "elecReplay": {
        "codepoint": "U+EB24",
        "description": "Replay"
    },
    "elecRewind": {
        "codepoint": "U+EB20",
        "description": "Rewind"
    },
    "elecShuffle": {
        "codepoint": "U+EB25",
        "description": "Shuffle"
    },
    "elecSkipBackwards": {
        "codepoint": "U+EB22",
        "description": "Skip backwards"
    },
    "elecSkipForwards": {
        "codepoint": "U+EB21",
        "description": "Skip forwards"
    },
    "elecStop": {
        "codepoint": "U+EB1D",
        "description": "Stop"
    },
    "elecTape": {
        "codepoint": "U+EB14",
        "description": "Tape"
    },
    "elecUSB": {
        "codepoint": "U+EB16",
        "description": "USB connection"
    },
    "elecUnmute": {
        "codepoint": "U+EB27",
        "description": "Unmute"
    },
    "elecUpload": {
        "codepoint": "U+EB50",
        "description": "Upload"
    },
    "elecVideoCamera": {
        "codepoint": "U+EB17",
        "description": "Video camera"
    },
    "elecVideoIn": {
        "codepoint": "U+EB4B",
        "description": "Video in"
    },
    "elecVideoOut": {
        "codepoint": "U+EB4C",
        "description": "Video out"
    },
    "elecVolumeFader": {
        "codepoint": "U+EB2C",
        "description": "Combining volume fader"
    },
    "elecVolumeFaderThumb": {
        "codepoint": "U+EB2D",
        "description": "Combining volume fader thumb"
    },
    "elecVolumeLevel0": {
        "codepoint": "U+EB2E",
        "description": "Volume level 0%"
    },
    "elecVolumeLevel100": {
        "codepoint": "U+EB33",
        "description": "Volume level 100%"
    },
    "elecVolumeLevel20": {
        "codepoint": "U+EB2F",
        "description": "Volume level 20%"
    },
    "elecVolumeLevel40": {
        "codepoint": "U+EB30",
        "description": "Volume level 40%"
    },
    "elecVolumeLevel60": {
        "codepoint": "U+EB31",
        "description": "Volume level 60%"
    },
    "elecVolumeLevel80": {
        "codepoint": "U+EB32",
        "description": "Volume level 80%"
    },
    "fClef": {
        "alternateCodepoint": "U+1D122",
        "codepoint": "U+E062",
        "description": "F clef"
    },
    "fClef15ma": {
        "codepoint": "U+E066",
        "description": "F clef quindicesima alta"
    },
    "fClef15mb": {
        "codepoint": "U+E063",
        "description": "F clef quindicesima bassa"
    },
    "fClef8va": {
        "alternateCodepoint": "U+1D123",
        "codepoint": "U+E065",
        "description": "F clef ottava alta"
    },
    "fClef8vb": {
        "alternateCodepoint": "U+1D124",
        "codepoint": "U+E064",
        "description": "F clef ottava bassa"
    },
    "fClefArrowDown": {
        "codepoint": "U+E068",
        "description": "F clef, arrow down"
    },
    "fClefArrowUp": {
        "codepoint": "U+E067",
        "description": "F clef, arrow up"
    },
    "fClefChange": {
        "codepoint": "U+E07C",
        "description": "F clef change"
    },
    "fClefReversed": {
        "codepoint": "U+E076",
        "description": "Reversed F clef"
    },
    "fClefTurned": {
        "codepoint": "U+E077",
        "description": "Turned F clef"
    },
    "fermataAbove": {
        "alternateCodepoint": "U+1D110",
        "codepoint": "U+E4C0",
        "description": "Fermata above"
    },
    "fermataBelow": {
        "alternateCodepoint": "U+1D111",
        "codepoint": "U+E4C1",
        "description": "Fermata below"
    },
    "fermataLongAbove": {
        "codepoint": "U+E4C6",
        "description": "Long fermata above"
    },
    "fermataLongBelow": {
        "codepoint": "U+E4C7",
        "description": "Long fermata below"
    },
    "fermataLongHenzeAbove": {
        "codepoint": "U+E4CA",
        "description": "Long fermata (Henze) above"
    },
    "fermataLongHenzeBelow": {
        "codepoint": "U+E4CB",
        "description": "Long fermata (Henze) below"
    },
    "fermataShortAbove": {
        "codepoint": "U+E4C4",
        "description": "Short fermata above"
    },
    "fermataShortBelow": {
        "codepoint": "U+E4C5",
        "description": "Short fermata below"
    },
    "fermataShortHenzeAbove": {
        "codepoint": "U+E4CC",
        "description": "Short fermata (Henze) above"
    },
    "fermataShortHenzeBelow": {
        "codepoint": "U+E4CD",
        "description": "Short fermata (Henze) below"
    },
    "fermataVeryLongAbove": {
        "codepoint": "U+E4C8",
        "description": "Very long fermata above"
    },
    "fermataVeryLongBelow": {
        "codepoint": "U+E4C9",
        "description": "Very long fermata below"
    },
    "fermataVeryShortAbove": {
        "codepoint": "U+E4C2",
        "description": "Very short fermata above"
    },
    "fermataVeryShortBelow": {
        "codepoint": "U+E4C3",
        "description": "Very short fermata below"
    },
    "figbass0": {
        "codepoint": "U+EA50",
        "description": "Figured bass 0"
    },
    "figbass1": {
        "codepoint": "U+EA51",
        "description": "Figured bass 1"
    },
    "figbass2": {
        "codepoint": "U+EA52",
        "description": "Figured bass 2"
    },
    "figbass2Raised": {
        "codepoint": "U+EA53",
        "description": "Figured bass 2 raised by half-step"
    },
    "figbass3": {
        "codepoint": "U+EA54",
        "description": "Figured bass 3"
    },
    "figbass4": {
        "codepoint": "U+EA55",
        "description": "Figured bass 4"
    },
    "figbass4Raised": {
        "codepoint": "U+EA56",
        "description": "Figured bass 4 raised by half-step"
    },
    "figbass5": {
        "codepoint": "U+EA57",
        "description": "Figured bass 5"
    },
    "figbass5Raised1": {
        "codepoint": "U+EA58",
        "description": "Figured bass 5 raised by half-step"
    },
    "figbass5Raised2": {
        "codepoint": "U+EA59",
        "description": "Figured bass 5 raised by half-step 2"
    },
    "figbass5Raised3": {
        "codepoint": "U+EA5A",
        "description": "Figured bass diminished 5"
    },
    "figbass6": {
        "codepoint": "U+EA5B",
        "description": "Figured bass 6"
    },
    "figbass6Raised": {
        "codepoint": "U+EA5C",
        "description": "Figured bass 6 raised by half-step"
    },
    "figbass6Raised2": {
        "codepoint": "U+EA6F",
        "description": "Figured bass 6 raised by half-step 2"
    },
    "figbass7": {
        "codepoint": "U+EA5D",
        "description": "Figured bass 7"
    },
    "figbass7Diminished": {
        "codepoint": "U+ECC0",
        "description": "Figured bass 7 diminished"
    },
    "figbass7Raised1": {
        "codepoint": "U+EA5E",
        "description": "Figured bass 7 raised by half-step"
    },
    "figbass7Raised2": {
        "codepoint": "U+EA5F",
        "description": "Figured bass 7 raised by a half-step 2"
    },
    "figbass8": {
        "codepoint": "U+EA60",
        "description": "Figured bass 8"
    },
    "figbass9": {
        "codepoint": "U+EA61",
        "description": "Figured bass 9"
    },
    "figbass9Raised": {
        "codepoint": "U+EA62",
        "description": "Figured bass 9 raised by half-step"
    },
    "figbassBracketLeft": {
        "codepoint": "U+EA68",
        "description": "Figured bass ["
    },
    "figbassBracketRight": {
        "codepoint": "U+EA69",
        "description": "Figured bass ]"
    },
    "figbassCombiningLowering": {
        "codepoint": "U+EA6E",
        "description": "Combining lower"
    },
    "figbassCombiningRaising": {
        "codepoint": "U+EA6D",
        "description": "Combining raise"
    },
    "figbassDoubleFlat": {
        "codepoint": "U+EA63",
        "description": "Figured bass double flat"
    },
    "figbassDoubleSharp": {
        "codepoint": "U+EA67",
        "description": "Figured bass double sharp"
    },
    "figbassFlat": {
        "codepoint": "U+EA64",
        "description": "Figured bass flat"
    },
    "figbassNatural": {
        "codepoint": "U+EA65",
        "description": "Figured bass natural"
    },
    "figbassParensLeft": {
        "codepoint": "U+EA6A",
        "description": "Figured bass ("
    },
    "figbassParensRight": {
        "codepoint": "U+EA6B",
        "description": "Figured bass )"
    },
    "figbassPlus": {
        "codepoint": "U+EA6C",
        "description": "Figured bass +"
    },
    "figbassSharp": {
        "codepoint": "U+EA66",
        "description": "Figured bass sharp"
    },
    "fingering0": {
        "codepoint": "U+ED10",
        "description": "Fingering 0 (open string)"
    },
    "fingering0Italic": {
        "codepoint": "U+ED80",
        "description": "Fingering 0 italic (open string)"
    },
    "fingering1": {
        "codepoint": "U+ED11",
        "description": "Fingering 1 (thumb)"
    },
    "fingering1Italic": {
        "codepoint": "U+ED81",
        "description": "Fingering 1 italic (thumb)"
    },
    "fingering2": {
        "codepoint": "U+ED12",
        "description": "Fingering 2 (index finger)"
    },
    "fingering2Italic": {
        "codepoint": "U+ED82",
        "description": "Fingering 2 italic (index finger)"
    },
    "fingering3": {
        "codepoint": "U+ED13",
        "description": "Fingering 3 (middle finger)"
    },
    "fingering3Italic": {
        "codepoint": "U+ED83",
        "description": "Fingering 3 italic (middle finger)"
    },
    "fingering4": {
        "codepoint": "U+ED14",
        "description": "Fingering 4 (ring finger)"
    },
    "fingering4Italic": {
        "codepoint": "U+ED84",
        "description": "Fingering 4 italic (ring finger)"
    },
    "fingering5": {
        "codepoint": "U+ED15",
        "description": "Fingering 5 (little finger)"
    },
    "fingering5Italic": {
        "codepoint": "U+ED85",
        "description": "Fingering 5 italic (little finger)"
    },
    "fingering6": {
        "codepoint": "U+ED24",
        "description": "Fingering 6"
    },
    "fingering6Italic": {
        "codepoint": "U+ED86",
        "description": "Fingering 6 italic"
    },
    "fingering7": {
        "codepoint": "U+ED25",
        "description": "Fingering 7"
    },
    "fingering7Italic": {
        "codepoint": "U+ED87",
        "description": "Fingering 7 italic"
    },
    "fingering8": {
        "codepoint": "U+ED26",
        "description": "Fingering 8"
    },
    "fingering8Italic": {
        "codepoint": "U+ED88",
        "description": "Fingering 8 italic"
    },
    "fingering9": {
        "codepoint": "U+ED27",
        "description": "Fingering 9"
    },
    "fingering9Italic": {
        "codepoint": "U+ED89",
        "description": "Fingering 9 italic"
    },
    "fingeringALower": {
        "codepoint": "U+ED1B",
        "description": "Fingering a (anular; right-hand ring finger for guitar)"
    },
    "fingeringCLower": {
        "codepoint": "U+ED1C",
        "description": "Fingering c (right-hand little finger for guitar)"
    },
    "fingeringELower": {
        "codepoint": "U+ED1E",
        "description": "Fingering e (right-hand little finger for guitar)"
    },
    "fingeringILower": {
        "codepoint": "U+ED19",
        "description": "Fingering i (indicio; right-hand index finger for guitar)"
    },
    "fingeringLeftBracket": {
        "codepoint": "U+ED2A",
        "description": "Fingering left bracket"
    },
    "fingeringLeftBracketItalic": {
        "codepoint": "U+ED8C",
        "description": "Fingering left bracket italic"
    },
    "fingeringLeftParenthesis": {
        "codepoint": "U+ED28",
        "description": "Fingering left parenthesis"
    },
    "fingeringLeftParenthesisItalic": {
        "codepoint": "U+ED8A",
        "description": "Fingering left parenthesis italic"
    },
    "fingeringMLower": {
        "codepoint": "U+ED1A",
        "description": "Fingering m (medio; right-hand middle finger for guitar)"
    },
    "fingeringMultipleNotes": {
        "codepoint": "U+ED23",
        "description": "Multiple notes played by thumb or single finger"
    },
    "fingeringOLower": {
        "codepoint": "U+ED1F",
        "description": "Fingering o (right-hand little finger for guitar)"
    },
    "fingeringPLower": {
        "codepoint": "U+ED17",
        "description": "Fingering p (pulgar; right-hand thumb for guitar)"
    },
    "fingeringRightBracket": {
        "codepoint": "U+ED2B",
        "description": "Fingering right bracket"
    },
    "fingeringRightBracketItalic": {
        "codepoint": "U+ED8D",
        "description": "Fingering right bracket italic"
    },
    "fingeringRightParenthesis": {
        "codepoint": "U+ED29",
        "description": "Fingering right parenthesis"
    },
    "fingeringRightParenthesisItalic": {
        "codepoint": "U+ED8B",
        "description": "Fingering right parenthesis italic"
    },
    "fingeringSeparatorMiddleDot": {
        "codepoint": "U+ED2C",
        "description": "Fingering middle dot separator"
    },
    "fingeringSeparatorMiddleDotWhite": {
        "codepoint": "U+ED2D",
        "description": "Fingering white middle dot separator"
    },
    "fingeringSeparatorSlash": {
        "codepoint": "U+ED2E",
        "description": "Fingering forward slash separator"
    },
    "fingeringSubstitutionAbove": {
        "codepoint": "U+ED20",
        "description": "Finger substitution above"
    },
    "fingeringSubstitutionBelow": {
        "codepoint": "U+ED21",
        "description": "Finger substitution below"
    },
    "fingeringSubstitutionDash": {
        "codepoint": "U+ED22",
        "description": "Finger substitution dash"
    },
    "fingeringTLower": {
        "codepoint": "U+ED18",
        "description": "Fingering t (right-hand thumb for guitar)"
    },
    "fingeringTUpper": {
        "codepoint": "U+ED16",
        "description": "Fingering T (left-hand thumb for guitar)"
    },
    "fingeringXLower": {
        "codepoint": "U+ED1D",
        "description": "Fingering x (right-hand little finger for guitar)"
    },
    "flag1024thDown": {
        "codepoint": "U+E24F",
        "description": "Combining flag 8 (1024th) below"
    },
    "flag1024thUp": {
        "codepoint": "U+E24E",
        "description": "Combining flag 8 (1024th) above"
    },
    "flag128thDown": {
        "codepoint": "U+E249",
        "description": "Combining flag 5 (128th) below"
    },
    "flag128thUp": {
        "alternateCodepoint": "U+1D172",
        "codepoint": "U+E248",
        "description": "Combining flag 5 (128th) above"
    },
    "flag16thDown": {
        "codepoint": "U+E243",
        "description": "Combining flag 2 (16th) below"
    },
    "flag16thUp": {
        "alternateCodepoint": "U+1D16F",
        "codepoint": "U+E242",
        "description": "Combining flag 2 (16th) above"
    },
    "flag256thDown": {
        "codepoint": "U+E24B",
        "description": "Combining flag 6 (256th) below"
    },
    "flag256thUp": {
        "codepoint": "U+E24A",
        "description": "Combining flag 6 (256th) above"
    },
    "flag32ndDown": {
        "codepoint": "U+E245",
        "description": "Combining flag 3 (32nd) below"
    },
    "flag32ndUp": {
        "alternateCodepoint": "U+1D170",
        "codepoint": "U+E244",
        "description": "Combining flag 3 (32nd) above"
    },
    "flag512thDown": {
        "codepoint": "U+E24D",
        "description": "Combining flag 7 (512th) below"
    },
    "flag512thUp": {
        "codepoint": "U+E24C",
        "description": "Combining flag 7 (512th) above"
    },
    "flag64thDown": {
        "codepoint": "U+E247",
        "description": "Combining flag 4 (64th) below"
    },
    "flag64thUp": {
        "alternateCodepoint": "U+1D171",
        "codepoint": "U+E246",
        "description": "Combining flag 4 (64th) above"
    },
    "flag8thDown": {
        "codepoint": "U+E241",
        "description": "Combining flag 1 (8th) below"
    },
    "flag8thUp": {
        "alternateCodepoint": "U+1D16E",
        "codepoint": "U+E240",
        "description": "Combining flag 1 (8th) above"
    },
    "flagInternalDown": {
        "codepoint": "U+E251",
        "description": "Internal combining flag below"
    },
    "flagInternalUp": {
        "codepoint": "U+E250",
        "description": "Internal combining flag above"
    },
    "fretboard3String": {
        "codepoint": "U+E850",
        "description": "3-string fretboard"
    },
    "fretboard3StringNut": {
        "codepoint": "U+E851",
        "description": "3-string fretboard at nut"
    },
    "fretboard4String": {
        "alternateCodepoint": "U+1D11D",
        "codepoint": "U+E852",
        "description": "4-string fretboard"
    },
    "fretboard4StringNut": {
        "codepoint": "U+E853",
        "description": "4-string fretboard at nut"
    },
    "fretboard5String": {
        "codepoint": "U+E854",
        "description": "5-string fretboard"
    },
    "fretboard5StringNut": {
        "codepoint": "U+E855",
        "description": "5-string fretboard at nut"
    },
    "fretboard6String": {
        "alternateCodepoint": "U+1D11C",
        "codepoint": "U+E856",
        "description": "6-string fretboard"
    },
    "fretboard6StringNut": {
        "codepoint": "U+E857",
        "description": "6-string fretboard at nut"
    },
    "fretboardFilledCircle": {
        "codepoint": "U+E858",
        "description": "Fingered fret (filled circle)"
    },
    "fretboardO": {
        "codepoint": "U+E85A",
        "description": "Open string (O)"
    },
    "fretboardX": {
        "codepoint": "U+E859",
        "description": "String not played (X)"
    },
    "functionAngleLeft": {
        "codepoint": "U+EA93",
        "description": "Function theory angle bracket left"
    },
    "functionAngleRight": {
        "codepoint": "U+EA94",
        "description": "Function theory angle bracket right"
    },
    "functionBracketLeft": {
        "codepoint": "U+EA8F",
        "description": "Function theory bracket left"
    },
    "functionBracketRight": {
        "codepoint": "U+EA90",
        "description": "Function theory bracket right"
    },
    "functionDD": {
        "codepoint": "U+EA81",
        "description": "Function theory dominant of dominant"
    },
    "functionDLower": {
        "codepoint": "U+EA80",
        "description": "Function theory minor dominant"
    },
    "functionDUpper": {
        "codepoint": "U+EA7F",
        "description": "Function theory major dominant"
    },
    "functionEight": {
        "codepoint": "U+EA78",
        "description": "Function theory 8"
    },
    "functionFUpper": {
        "codepoint": "U+EA99",
        "description": "Function theory F"
    },
    "functionFive": {
        "codepoint": "U+EA75",
        "description": "Function theory 5"
    },
    "functionFour": {
        "codepoint": "U+EA74",
        "description": "Function theory 4"
    },
    "functionGLower": {
        "codepoint": "U+EA84",
        "description": "Function theory g"
    },
    "functionGUpper": {
        "codepoint": "U+EA83",
        "description": "Function theory G"
    },
    "functionGreaterThan": {
        "codepoint": "U+EA7C",
        "description": "Function theory greater than"
    },
    "functionILower": {
        "codepoint": "U+EA9B",
        "description": "Function theory i"
    },
    "functionIUpper": {
        "codepoint": "U+EA9A",
        "description": "Function theory I"
    },
    "functionKLower": {
        "codepoint": "U+EA9D",
        "description": "Function theory k"
    },
    "functionKUpper": {
        "codepoint": "U+EA9C",
        "description": "Function theory K"
    },
    "functionLLower": {
        "codepoint": "U+EA9F",
        "description": "Function theory l"
    },
    "functionLUpper": {
        "codepoint": "U+EA9E",
        "description": "Function theory L"
    },
    "functionLessThan": {
        "codepoint": "U+EA7A",
        "description": "Function theory less than"
    },
    "functionMLower": {
        "codepoint": "U+ED01",
        "description": "Function theory m"
    },
    "functionMUpper": {
        "codepoint": "U+ED00",
        "description": "Function theory M"
    },
    "functionMinus": {
        "codepoint": "U+EA7B",
        "description": "Function theory minus"
    },
    "functionNLower": {
        "codepoint": "U+EA86",
        "description": "Function theory n"
    },
    "functionNUpper": {
        "codepoint": "U+EA85",
        "description": "Function theory N"
    },
    "functionNUpperSuperscript": {
        "codepoint": "U+ED02",
        "description": "Function theory superscript N"
    },
    "functionNine": {
        "codepoint": "U+EA79",
        "description": "Function theory 9"
    },
    "functionOne": {
        "codepoint": "U+EA71",
        "description": "Function theory 1"
    },
    "functionPLower": {
        "codepoint": "U+EA88",
        "description": "Function theory p"
    },
    "functionPUpper": {
        "codepoint": "U+EA87",
        "description": "Function theory P"
    },
    "functionParensLeft": {
        "codepoint": "U+EA91",
        "description": "Function theory parenthesis left"
    },
    "functionParensRight": {
        "codepoint": "U+EA92",
        "description": "Function theory parenthesis right"
    },
    "functionPlus": {
        "codepoint": "U+EA98",
        "description": "Function theory prefix plus"
    },
    "functionRLower": {
        "codepoint": "U+ED03",
        "description": "Function theory r"
    },
    "functionRepetition1": {
        "codepoint": "U+EA95",
        "description": "Function theory repetition 1"
    },
    "functionRepetition2": {
        "codepoint": "U+EA96",
        "description": "Function theory repetition 2"
    },
    "functionRing": {
        "codepoint": "U+EA97",
        "description": "Function theory prefix ring"
    },
    "functionSLower": {
        "codepoint": "U+EA8A",
        "description": "Function theory minor subdominant"
    },
    "functionSSLower": {
        "codepoint": "U+EA7E",
        "description": "Function theory minor subdominant of subdominant"
    },
    "functionSSUpper": {
        "codepoint": "U+EA7D",
        "description": "Function theory major subdominant of subdominant"
    },
    "functionSUpper": {
        "codepoint": "U+EA89",
        "description": "Function theory major subdominant"
    },
    "functionSeven": {
        "codepoint": "U+EA77",
        "description": "Function theory 7"
    },
    "functionSix": {
        "codepoint": "U+EA76",
        "description": "Function theory 6"
    },
    "functionSlashedDD": {
        "codepoint": "U+EA82",
        "description": "Function theory double dominant seventh"
    },
    "functionTLower": {
        "codepoint": "U+EA8C",
        "description": "Function theory minor tonic"
    },
    "functionTUpper": {
        "codepoint": "U+EA8B",
        "description": "Function theory tonic"
    },
    "functionThree": {
        "codepoint": "U+EA73",
        "description": "Function theory 3"
    },
    "functionTwo": {
        "codepoint": "U+EA72",
        "description": "Function theory 2"
    },
    "functionVLower": {
        "codepoint": "U+EA8E",
        "description": "Function theory v"
    },
    "functionVUpper": {
        "codepoint": "U+EA8D",
        "description": "Function theory V"
    },
    "functionZero": {
        "codepoint": "U+EA70",
        "description": "Function theory 0"
    },
    "gClef": {
        "alternateCodepoint": "U+1D11E",
        "codepoint": "U+E050",
        "description": "G clef"
    },
    "gClef15ma": {
        "codepoint": "U+E054",
        "description": "G clef quindicesima alta"
    },
    "gClef15mb": {
        "codepoint": "U+E051",
        "description": "G clef quindicesima bassa"
    },
    "gClef8va": {
        "alternateCodepoint": "U+1D11F",
        "codepoint": "U+E053",
        "description": "G clef ottava alta"
    },
    "gClef8vb": {
        "alternateCodepoint": "U+1D120",
        "codepoint": "U+E052",
        "description": "G clef ottava bassa"
    },
    "gClef8vbCClef": {
        "codepoint": "U+E056",
        "description": "G clef ottava bassa with C clef"
    },
    "gClef8vbOld": {
        "codepoint": "U+E055",
        "description": "G clef ottava bassa (old style)"
    },
    "gClef8vbParens": {
        "codepoint": "U+E057",
        "description": "G clef, optionally ottava bassa"
    },
    "gClefArrowDown": {
        "codepoint": "U+E05B",
        "description": "G clef, arrow down"
    },
    "gClefArrowUp": {
        "codepoint": "U+E05A",
        "description": "G clef, arrow up"
    },
    "gClefChange": {
        "codepoint": "U+E07A",
        "description": "G clef change"
    },
    "gClefLigatedNumberAbove": {
        "codepoint": "U+E059",
        "description": "Combining G clef, number above"
    },
    "gClefLigatedNumberBelow": {
        "codepoint": "U+E058",
        "description": "Combining G clef, number below"
    },
    "gClefReversed": {
        "codepoint": "U+E073",
        "description": "Reversed G clef"
    },
    "gClefTurned": {
        "codepoint": "U+E074",
        "description": "Turned G clef"
    },
    "glissandoDown": {
        "alternateCodepoint": "U+1D1B2",
        "codepoint": "U+E586",
        "description": "Glissando down"
    },
    "glissandoUp": {
        "alternateCodepoint": "U+1D1B1",
        "codepoint": "U+E585",
        "description": "Glissando up"
    },
    "graceNoteAcciaccaturaStemDown": {
        "codepoint": "U+E561",
        "description": "Slashed grace note stem down"
    },
    "graceNoteAcciaccaturaStemUp": {
        "alternateCodepoint": "U+1D194",
        "codepoint": "U+E560",
        "description": "Slashed grace note stem up"
    },
    "graceNoteAppoggiaturaStemDown": {
        "codepoint": "U+E563",
        "description": "Grace note stem down"
    },
    "graceNoteAppoggiaturaStemUp": {
        "alternateCodepoint": "U+1D195",
        "codepoint": "U+E562",
        "description": "Grace note stem up"
    },
    "graceNoteSlashStemDown": {
        "codepoint": "U+E565",
        "description": "Slash for stem down grace note"
    },
    "graceNoteSlashStemUp": {
        "codepoint": "U+E564",
        "description": "Slash for stem up grace note"
    },
    "guitarBarreFull": {
        "codepoint": "U+E848",
        "description": "Full barr\u00e9"
    },
    "guitarBarreHalf": {
        "codepoint": "U+E849",
        "description": "Half barr\u00e9"
    },
    "guitarClosePedal": {
        "codepoint": "U+E83F",
        "description": "Closed wah/volume pedal"
    },
    "guitarFadeIn": {
        "codepoint": "U+E843",
        "description": "Fade in"
    },
    "guitarFadeOut": {
        "codepoint": "U+E844",
        "description": "Fade out"
    },
    "guitarGolpe": {
        "codepoint": "U+E842",
        "description": "Golpe (tapping the pick guard)"
    },
    "guitarHalfOpenPedal": {
        "codepoint": "U+E83E",
        "description": "Half-open wah/volume pedal"
    },
    "guitarLeftHandTapping": {
        "codepoint": "U+E840",
        "description": "Left-hand tapping"
    },
    "guitarOpenPedal": {
        "codepoint": "U+E83D",
        "description": "Open wah/volume pedal"
    },
    "guitarRightHandTapping": {
        "codepoint": "U+E841",
        "description": "Right-hand tapping"
    },
    "guitarShake": {
        "codepoint": "U+E832",
        "description": "Guitar shake"
    },
    "guitarString0": {
        "codepoint": "U+E833",
        "description": "String number 0"
    },
    "guitarString1": {
        "codepoint": "U+E834",
        "description": "String number 1"
    },
    "guitarString2": {
        "codepoint": "U+E835",
        "description": "String number 2"
    },
    "guitarString3": {
        "codepoint": "U+E836",
        "description": "String number 3"
    },
    "guitarString4": {
        "codepoint": "U+E837",
        "description": "String number 4"
    },
    "guitarString5": {
        "codepoint": "U+E838",
        "description": "String number 5"
    },
    "guitarString6": {
        "codepoint": "U+E839",
        "description": "String number 6"
    },
    "guitarString7": {
        "codepoint": "U+E83A",
        "description": "String number 7"
    },
    "guitarString8": {
        "codepoint": "U+E83B",
        "description": "String number 8"
    },
    "guitarString9": {
        "codepoint": "U+E83C",
        "description": "String number 9"
    },
    "guitarStrumDown": {
        "codepoint": "U+E847",
        "description": "Strum direction down"
    },
    "guitarStrumUp": {
        "codepoint": "U+E846",
        "description": "Strum direction up"
    },
    "guitarVibratoBarDip": {
        "codepoint": "U+E831",
        "description": "Guitar vibrato bar dip"
    },
    "guitarVibratoBarScoop": {
        "codepoint": "U+E830",
        "description": "Guitar vibrato bar scoop"
    },
    "guitarVibratoStroke": {
        "codepoint": "U+EAB2",
        "description": "Vibrato wiggle segment"
    },
    "guitarVolumeSwell": {
        "codepoint": "U+E845",
        "description": "Volume swell"
    },
    "guitarWideVibratoStroke": {
        "codepoint": "U+EAB3",
        "description": "Wide vibrato wiggle segment"
    },
    "handbellsBelltree": {
        "codepoint": "U+E81F",
        "description": "Belltree"
    },
    "handbellsDamp3": {
        "codepoint": "U+E81E",
        "description": "Damp 3"
    },
    "handbellsEcho1": {
        "codepoint": "U+E81B",
        "description": "Echo"
    },
    "handbellsEcho2": {
        "codepoint": "U+E81C",
        "description": "Echo 2"
    },
    "handbellsGyro": {
        "codepoint": "U+E81D",
        "description": "Gyro"
    },
    "handbellsHandMartellato": {
        "codepoint": "U+E812",
        "description": "Hand martellato"
    },
    "handbellsMalletBellOnTable": {
        "codepoint": "U+E815",
        "description": "Mallet, bell on table"
    },
    "handbellsMalletBellSuspended": {
        "codepoint": "U+E814",
        "description": "Mallet, bell suspended"
    },
    "handbellsMalletLft": {
        "codepoint": "U+E816",
        "description": "Mallet lift"
    },
    "handbellsMartellato": {
        "codepoint": "U+E810",
        "description": "Martellato"
    },
    "handbellsMartellatoLift": {
        "codepoint": "U+E811",
        "description": "Martellato lift"
    },
    "handbellsMutedMartellato": {
        "codepoint": "U+E813",
        "description": "Muted martellato"
    },
    "handbellsPluckLift": {
        "codepoint": "U+E817",
        "description": "Pluck lift"
    },
    "handbellsSwing": {
        "codepoint": "U+E81A",
        "description": "Swing"
    },
    "handbellsSwingDown": {
        "codepoint": "U+E819",
        "description": "Swing down"
    },
    "handbellsSwingUp": {
        "codepoint": "U+E818",
        "description": "Swing up"
    },
    "handbellsTablePairBells": {
        "codepoint": "U+E821",
        "description": "Table pair of handbells"
    },
    "handbellsTableSingleBell": {
        "codepoint": "U+E820",
        "description": "Table single handbell"
    },
    "harpMetalRod": {
        "codepoint": "U+E68F",
        "description": "Metal rod pictogram"
    },
    "harpPedalCentered": {
        "codepoint": "U+E681",
        "description": "Harp pedal centered (natural)"
    },
    "harpPedalDivider": {
        "codepoint": "U+E683",
        "description": "Harp pedal divider"
    },
    "harpPedalLowered": {
        "codepoint": "U+E682",
        "description": "Harp pedal lowered (sharp)"
    },
    "harpPedalRaised": {
        "codepoint": "U+E680",
        "description": "Harp pedal raised (flat)"
    },
    "harpSalzedoAeolianAscending": {
        "codepoint": "U+E695",
        "description": "Ascending aeolian chords (Salzedo)"
    },
    "harpSalzedoAeolianDescending": {
        "codepoint": "U+E696",
        "description": "Descending aeolian chords (Salzedo)"
    },
    "harpSalzedoDampAbove": {
        "codepoint": "U+E69A",
        "description": "Damp above (Salzedo)"
    },
    "harpSalzedoDampBelow": {
        "codepoint": "U+E699",
        "description": "Damp below (Salzedo)"
    },
    "harpSalzedoDampBothHands": {
        "codepoint": "U+E698",
        "description": "Damp with both hands (Salzedo)"
    },
    "harpSalzedoDampLowStrings": {
        "codepoint": "U+E697",
        "description": "Damp only low strings (Salzedo)"
    },
    "harpSalzedoFluidicSoundsLeft": {
        "codepoint": "U+E68D",
        "description": "Fluidic sounds, left hand (Salzedo)"
    },
    "harpSalzedoFluidicSoundsRight": {
        "codepoint": "U+E68E",
        "description": "Fluidic sounds, right hand (Salzedo)"
    },
    "harpSalzedoIsolatedSounds": {
        "codepoint": "U+E69C",
        "description": "Isolated sounds (Salzedo)"
    },
    "harpSalzedoMetallicSounds": {
        "codepoint": "U+E688",
        "description": "Metallic sounds (Salzedo)"
    },
    "harpSalzedoMetallicSoundsOneString": {
        "codepoint": "U+E69B",
        "description": "Metallic sounds, one string (Salzedo)"
    },
    "harpSalzedoMuffleTotally": {
        "codepoint": "U+E68C",
        "description": "Muffle totally (Salzedo)"
    },
    "harpSalzedoOboicFlux": {
        "codepoint": "U+E685",
        "description": "Oboic flux (Salzedo)"
    },
    "harpSalzedoPlayUpperEnd": {
        "codepoint": "U+E68A",
        "description": "Play at upper end of strings (Salzedo)"
    },
    "harpSalzedoSlideWithSuppleness": {
        "codepoint": "U+E684",
        "description": "Slide with suppleness (Salzedo)"
    },
    "harpSalzedoSnareDrum": {
        "codepoint": "U+E69D",
        "description": "Snare drum effect (Salzedo)"
    },
    "harpSalzedoTamTamSounds": {
        "codepoint": "U+E689",
        "description": "Tam-tam sounds (Salzedo)"
    },
    "harpSalzedoThunderEffect": {
        "codepoint": "U+E686",
        "description": "Thunder effect (Salzedo)"
    },
    "harpSalzedoTimpanicSounds": {
        "codepoint": "U+E68B",
        "description": "Timpanic sounds (Salzedo)"
    },
    "harpSalzedoWhistlingSounds": {
        "codepoint": "U+E687",
        "description": "Whistling sounds (Salzedo)"
    },
    "harpStringNoiseStem": {
        "codepoint": "U+E694",
        "description": "Combining string noise for stem"
    },
    "harpTuningKey": {
        "codepoint": "U+E690",
        "description": "Tuning key pictogram"
    },
    "harpTuningKeyGlissando": {
        "codepoint": "U+E693",
        "description": "Retune strings for glissando"
    },
    "harpTuningKeyHandle": {
        "codepoint": "U+E691",
        "description": "Use handle of tuning key pictogram"
    },
    "harpTuningKeyShank": {
        "codepoint": "U+E692",
        "description": "Use shank of tuning key pictogram"
    },
    "indianDrumClef": {
        "codepoint": "U+ED70",
        "description": "Indian drum clef"
    },
    "kahnBackChug": {
        "codepoint": "U+EDE2",
        "description": "Back-chug"
    },
    "kahnBackFlap": {
        "codepoint": "U+EDD8",
        "description": "Back-flap"
    },
    "kahnBackRiff": {
        "codepoint": "U+EDE1",
        "description": "Back-riff"
    },
    "kahnBackRip": {
        "codepoint": "U+EDDA",
        "description": "Back-rip"
    },
    "kahnBallChange": {
        "codepoint": "U+EDC6",
        "description": "Ball-change"
    },
    "kahnBallDig": {
        "codepoint": "U+EDCD",
        "description": "Ball-dig"
    },
    "kahnBrushBackward": {
        "codepoint": "U+EDA7",
        "description": "Brush-backward"
    },
    "kahnBrushForward": {
        "codepoint": "U+EDA6",
        "description": "Brush-forward"
    },
    "kahnChug": {
        "codepoint": "U+EDDD",
        "description": "Chug"
    },
    "kahnClap": {
        "codepoint": "U+EDB8",
        "description": "Clap"
    },
    "kahnDoubleSnap": {
        "codepoint": "U+EDBA",
        "description": "Double-snap"
    },
    "kahnDoubleWing": {
        "codepoint": "U+EDEB",
        "description": "Double-wing"
    },
    "kahnDrawStep": {
        "codepoint": "U+EDB2",
        "description": "Draw-step"
    },
    "kahnDrawTap": {
        "codepoint": "U+EDB3",
        "description": "Draw-tap"
    },
    "kahnFlam": {
        "codepoint": "U+EDCF",
        "description": "Flam"
    },
    "kahnFlap": {
        "codepoint": "U+EDD5",
        "description": "Flap"
    },
    "kahnFlapStep": {
        "codepoint": "U+EDD7",
        "description": "Flap-step"
    },
    "kahnFlat": {
        "codepoint": "U+EDA9",
        "description": "Flat"
    },
    "kahnFleaHop": {
        "codepoint": "U+EDB0",
        "description": "Flea-hop"
    },
    "kahnFleaTap": {
        "codepoint": "U+EDB1",
        "description": "Flea-tap"
    },
    "kahnGraceTap": {
        "codepoint": "U+EDA8",
        "description": "Grace-tap"
    },
    "kahnGraceTapChange": {
        "codepoint": "U+EDD1",
        "description": "Grace-tap-change"
    },
    "kahnGraceTapHop": {
        "codepoint": "U+EDD0",
        "description": "Grace-tap-hop"
    },
    "kahnGraceTapStamp": {
        "codepoint": "U+EDD3",
        "description": "Grace-tap-stamp"
    },
    "kahnHeel": {
        "codepoint": "U+EDAA",
        "description": "Heel"
    },
    "kahnHeelChange": {
        "codepoint": "U+EDC9",
        "description": "Heel-change"
    },
    "kahnHeelClick": {
        "codepoint": "U+EDBB",
        "description": "Heel-click"
    },
    "kahnHeelDrop": {
        "codepoint": "U+EDB6",
        "description": "Heel-drop"
    },
    "kahnHeelStep": {
        "codepoint": "U+EDC4",
        "description": "Heel-step"
    },
    "kahnHeelTap": {
        "codepoint": "U+EDCB",
        "description": "Heel-tap"
    },
    "kahnHop": {
        "codepoint": "U+EDA2",
        "description": "Hop"
    },
    "kahnJumpApart": {
        "codepoint": "U+EDA5",
        "description": "Jump-apart"
    },
    "kahnJumpTogether": {
        "codepoint": "U+EDA4",
        "description": "Jump-together"
    },
    "kahnKneeInward": {
        "codepoint": "U+EDAD",
        "description": "Knee-inward"
    },
    "kahnKneeOutward": {
        "codepoint": "U+EDAC",
        "description": "Knee-outward"
    },
    "kahnLeap": {
        "codepoint": "U+EDA3",
        "description": "Leap"
    },
    "kahnLeapFlatFoot": {
        "codepoint": "U+EDD2",
        "description": "Leap-flat-foot"
    },
    "kahnLeapHeelClick": {
        "codepoint": "U+EDD4",
        "description": "Leap-heel-click"
    },
    "kahnLeftCatch": {
        "codepoint": "U+EDBF",
        "description": "Left-catch"
    },
    "kahnLeftCross": {
        "codepoint": "U+EDBD",
        "description": "Left-cross"
    },
    "kahnLeftFoot": {
        "codepoint": "U+EDEE",
        "description": "Left-foot"
    },
    "kahnLeftToeStrike": {
        "codepoint": "U+EDC1",
        "description": "Left-toe-strike"
    },
    "kahnLeftTurn": {
        "codepoint": "U+EDF0",
        "description": "Left-turn"
    },
    "kahnOverTheTop": {
        "codepoint": "U+EDEC",
        "description": "Over-the-top"
    },
    "kahnOverTheTopTap": {
        "codepoint": "U+EDED",
        "description": "Over-the-top-tap"
    },
    "kahnPull": {
        "codepoint": "U+EDE3",
        "description": "Pull"
    },
    "kahnPush": {
        "codepoint": "U+EDDE",
        "description": "Push"
    },
    "kahnRiff": {
        "codepoint": "U+EDE0",
        "description": "Riff"
    },
    "kahnRiffle": {
        "codepoint": "U+EDE7",
        "description": "Riffle"
    },
    "kahnRightCatch": {
        "codepoint": "U+EDC0",
        "description": "Right-catch"
    },
    "kahnRightCross": {
        "codepoint": "U+EDBE",
        "description": "Right-cross"
    },
    "kahnRightFoot": {
        "codepoint": "U+EDEF",
        "description": "Right-foot"
    },
    "kahnRightToeStrike": {
        "codepoint": "U+EDC2",
        "description": "Right-toe-strike"
    },
    "kahnRightTurn": {
        "codepoint": "U+EDF1",
        "description": "Right-turn"
    },
    "kahnRip": {
        "codepoint": "U+EDD6",
        "description": "Rip"
    },
    "kahnRipple": {
        "codepoint": "U+EDE8",
        "description": "Ripple"
    },
    "kahnScrape": {
        "codepoint": "U+EDAE",
        "description": "Scrape"
    },
    "kahnScuff": {
        "codepoint": "U+EDDC",
        "description": "Scuff"
    },
    "kahnScuffle": {
        "codepoint": "U+EDE6",
        "description": "Scuffle"
    },
    "kahnShuffle": {
        "codepoint": "U+EDE5",
        "description": "Shuffle"
    },
    "kahnSlam": {
        "codepoint": "U+EDCE",
        "description": "Slam"
    },
    "kahnSlap": {
        "codepoint": "U+EDD9",
        "description": "Slap"
    },
    "kahnSlideStep": {
        "codepoint": "U+EDB4",
        "description": "Slide-step"
    },
    "kahnSlideTap": {
        "codepoint": "U+EDB5",
        "description": "Slide-tap"
    },
    "kahnSnap": {
        "codepoint": "U+EDB9",
        "description": "Snap"
    },
    "kahnStamp": {
        "codepoint": "U+EDC3",
        "description": "Stamp"
    },
    "kahnStampStamp": {
        "codepoint": "U+EDC8",
        "description": "Stamp-stamp"
    },
    "kahnStep": {
        "codepoint": "U+EDA0",
        "description": "Step"
    },
    "kahnStepStamp": {
        "codepoint": "U+EDC7",
        "description": "Step-stamp"
    },
    "kahnStomp": {
        "codepoint": "U+EDCA",
        "description": "Stomp"
    },
    "kahnStompBrush": {
        "codepoint": "U+EDDB",
        "description": "Stomp-brush"
    },
    "kahnTap": {
        "codepoint": "U+EDA1",
        "description": "Tap"
    },
    "kahnToe": {
        "codepoint": "U+EDAB",
        "description": "Toe"
    },
    "kahnToeClick": {
        "codepoint": "U+EDBC",
        "description": "Toe-click"
    },
    "kahnToeDrop": {
        "codepoint": "U+EDB7",
        "description": "Toe-drop"
    },
    "kahnToeStep": {
        "codepoint": "U+EDC5",
        "description": "Toe-step"
    },
    "kahnToeTap": {
        "codepoint": "U+EDCC",
        "description": "Toe-tap"
    },
    "kahnTrench": {
        "codepoint": "U+EDAF",
        "description": "Trench"
    },
    "kahnWing": {
        "codepoint": "U+EDE9",
        "description": "Wing"
    },
    "kahnWingChange": {
        "codepoint": "U+EDEA",
        "description": "Wing-change"
    },
    "kahnZank": {
        "codepoint": "U+EDE4",
        "description": "Zank"
    },
    "kahnZink": {
        "codepoint": "U+EDDF",
        "description": "Zink"
    },
    "keyboardBebung2DotsAbove": {
        "codepoint": "U+E668",
        "description": "Clavichord bebung, 2 finger movements (above)"
    },
    "keyboardBebung2DotsBelow": {
        "codepoint": "U+E669",
        "description": "Clavichord bebung, 2 finger movements (below)"
    },
    "keyboardBebung3DotsAbove": {
        "codepoint": "U+E66A",
        "description": "Clavichord bebung, 3 finger movements (above)"
    },
    "keyboardBebung3DotsBelow": {
        "codepoint": "U+E66B",
        "description": "Clavichord bebung, 3 finger movements (below)"
    },
    "keyboardBebung4DotsAbove": {
        "codepoint": "U+E66C",
        "description": "Clavichord bebung, 4 finger movements (above)"
    },
    "keyboardBebung4DotsBelow": {
        "codepoint": "U+E66D",
        "description": "Clavichord bebung, 4 finger movements (below)"
    },
    "keyboardLeftPedalPictogram": {
        "codepoint": "U+E65E",
        "description": "Left pedal pictogram"
    },
    "keyboardMiddlePedalPictogram": {
        "codepoint": "U+E65F",
        "description": "Middle pedal pictogram"
    },
    "keyboardPedalD": {
        "codepoint": "U+E653",
        "description": "Pedal d"
    },
    "keyboardPedalDot": {
        "codepoint": "U+E654",
        "description": "Pedal dot"
    },
    "keyboardPedalE": {
        "codepoint": "U+E652",
        "description": "Pedal e"
    },
    "keyboardPedalHalf": {
        "alternateCodepoint": "U+1D1B0",
        "codepoint": "U+E656",
        "description": "Half-pedal mark"
    },
    "keyboardPedalHalf2": {
        "codepoint": "U+E65B",
        "description": "Half pedal mark 1"
    },
    "keyboardPedalHalf3": {
        "codepoint": "U+E65C",
        "description": "Half pedal mark 2"
    },
    "keyboardPedalHeel1": {
        "codepoint": "U+E661",
        "description": "Pedal heel 1"
    },
    "keyboardPedalHeel2": {
        "codepoint": "U+E662",
        "description": "Pedal heel 2"
    },
    "keyboardPedalHeel3": {
        "codepoint": "U+E663",
        "description": "Pedal heel 3 (Davis)"
    },
    "keyboardPedalHeelToToe": {
        "codepoint": "U+E674",
        "description": "Pedal heel to toe"
    },
    "keyboardPedalHeelToe": {
        "codepoint": "U+E666",
        "description": "Pedal heel or toe"
    },
    "keyboardPedalHookEnd": {
        "codepoint": "U+E673",
        "description": "Pedal hook end"
    },
    "keyboardPedalHookStart": {
        "codepoint": "U+E672",
        "description": "Pedal hook start"
    },
    "keyboardPedalHyphen": {
        "codepoint": "U+E658",
        "description": "Pedal hyphen"
    },
    "keyboardPedalP": {
        "codepoint": "U+E651",
        "description": "Pedal P"
    },
    "keyboardPedalParensLeft": {
        "codepoint": "U+E676",
        "description": "Left parenthesis for pedal marking"
    },
    "keyboardPedalParensRight": {
        "codepoint": "U+E677",
        "description": "Right parenthesis for pedal marking"
    },
    "keyboardPedalPed": {
        "alternateCodepoint": "U+1D1AE",
        "codepoint": "U+E650",
        "description": "Pedal mark"
    },
    "keyboardPedalS": {
        "codepoint": "U+E65A",
        "description": "Pedal S"
    },
    "keyboardPedalSost": {
        "codepoint": "U+E659",
        "description": "Sostenuto pedal mark"
    },
    "keyboardPedalToe1": {
        "codepoint": "U+E664",
        "description": "Pedal toe 1"
    },
    "keyboardPedalToe2": {
        "codepoint": "U+E665",
        "description": "Pedal toe 2"
    },
    "keyboardPedalToeToHeel": {
        "codepoint": "U+E675",
        "description": "Pedal toe to heel"
    },
    "keyboardPedalUp": {
        "alternateCodepoint": "U+1D1AF",
        "codepoint": "U+E655",
        "description": "Pedal up mark"
    },
    "keyboardPedalUpNotch": {
        "codepoint": "U+E657",
        "description": "Pedal up notch"
    },
    "keyboardPedalUpSpecial": {
        "codepoint": "U+E65D",
        "description": "Pedal up special"
    },
    "keyboardPlayWithLH": {
        "codepoint": "U+E670",
        "description": "Play with left hand"
    },
    "keyboardPlayWithLHEnd": {
        "codepoint": "U+E671",
        "description": "Play with left hand (end)"
    },
    "keyboardPlayWithRH": {
        "codepoint": "U+E66E",
        "description": "Play with right hand"
    },
    "keyboardPlayWithRHEnd": {
        "codepoint": "U+E66F",
        "description": "Play with right hand (end)"
    },
    "keyboardPluckInside": {
        "codepoint": "U+E667",
        "description": "Pluck strings inside piano (Maderna)"
    },
    "keyboardRightPedalPictogram": {
        "codepoint": "U+E660",
        "description": "Right pedal pictogram"
    },
    "kievanAccidentalFlat": {
        "alternateCodepoint": "U+1D1E8",
        "codepoint": "U+EC3E",
        "description": "Kievan flat"
    },
    "kievanAccidentalSharp": {
        "codepoint": "U+EC3D",
        "description": "Kievan sharp"
    },
    "kievanAugmentationDot": {
        "codepoint": "U+EC3C",
        "description": "Kievan augmentation dot"
    },
    "kievanCClef": {
        "alternateCodepoint": "U+1D1DE",
        "codepoint": "U+EC30",
        "description": "Kievan C clef (tse-fa-ut)"
    },
    "kievanEndingSymbol": {
        "alternateCodepoint": "U+1D1DF",
        "codepoint": "U+EC31",
        "description": "Kievan ending symbol"
    },
    "kievanNote8thStemDown": {
        "alternateCodepoint": "U+1D1E6",
        "codepoint": "U+EC3A",
        "description": "Kievan eighth note, stem down"
    },
    "kievanNote8thStemUp": {
        "alternateCodepoint": "U+1D1E7",
        "codepoint": "U+EC39",
        "description": "Kievan eighth note, stem up"
    },
    "kievanNoteBeam": {
        "codepoint": "U+EC3B",
        "description": "Kievan beam"
    },
    "kievanNoteHalfStaffLine": {
        "alternateCodepoint": "U+1D1E3",
        "codepoint": "U+EC35",
        "description": "Kievan half note (on staff line)"
    },
    "kievanNoteHalfStaffSpace": {
        "codepoint": "U+EC36",
        "description": "Kievan half note (in staff space)"
    },
    "kievanNoteQuarterStemDown": {
        "alternateCodepoint": "U+1D1E4",
        "codepoint": "U+EC38",
        "description": "Kievan quarter note, stem down"
    },
    "kievanNoteQuarterStemUp": {
        "alternateCodepoint": "U+1D1E5",
        "codepoint": "U+EC37",
        "description": "Kievan quarter note, stem up"
    },
    "kievanNoteReciting": {
        "alternateCodepoint": "U+1D1E1",
        "codepoint": "U+EC32",
        "description": "Kievan reciting note"
    },
    "kievanNoteWhole": {
        "alternateCodepoint": "U+1D1E2",
        "codepoint": "U+EC33",
        "description": "Kievan whole note"
    },
    "kievanNoteWholeFinal": {
        "alternateCodepoint": "U+1D1E0",
        "codepoint": "U+EC34",
        "description": "Kievan final whole note"
    },
    "kodalyHandDo": {
        "codepoint": "U+EC40",
        "description": "Do hand sign"
    },
    "kodalyHandFa": {
        "codepoint": "U+EC43",
        "description": "Fa hand sign"
    },
    "kodalyHandLa": {
        "codepoint": "U+EC45",
        "description": "La hand sign"
    },
    "kodalyHandMi": {
        "codepoint": "U+EC42",
        "description": "Mi hand sign"
    },
    "kodalyHandRe": {
        "codepoint": "U+EC41",
        "description": "Re hand sign"
    },
    "kodalyHandSo": {
        "codepoint": "U+EC44",
        "description": "So hand sign"
    },
    "kodalyHandTi": {
        "codepoint": "U+EC46",
        "description": "Ti hand sign"
    },
    "leftRepeatSmall": {
        "codepoint": "U+E04C",
        "description": "Left repeat sign within bar"
    },
    "legerLine": {
        "codepoint": "U+E022",
        "description": "Leger line"
    },
    "legerLineNarrow": {
        "codepoint": "U+E024",
        "description": "Leger line (narrow)"
    },
    "legerLineWide": {
        "codepoint": "U+E023",
        "description": "Leger line (wide)"
    },
    "luteBarlineEndRepeat": {
        "codepoint": "U+EBA4",
        "description": "Lute tablature end repeat barline"
    },
    "luteBarlineFinal": {
        "codepoint": "U+EBA5",
        "description": "Lute tablature final barline"
    },
    "luteBarlineStartRepeat": {
        "codepoint": "U+EBA3",
        "description": "Lute tablature start repeat barline"
    },
    "luteDuration16th": {
        "codepoint": "U+EBAB",
        "description": "16th note (semiquaver) duration sign"
    },
    "luteDuration32nd": {
        "codepoint": "U+EBAC",
        "description": "32nd note (demisemiquaver) duration sign"
    },
    "luteDuration8th": {
        "codepoint": "U+EBAA",
        "description": "Eighth note (quaver) duration sign"
    },
    "luteDurationDoubleWhole": {
        "codepoint": "U+EBA6",
        "description": "Double whole note (breve) duration sign"
    },
    "luteDurationHalf": {
        "codepoint": "U+EBA8",
        "description": "Half note (minim) duration sign"
    },
    "luteDurationQuarter": {
        "codepoint": "U+EBA9",
        "description": "Quarter note (crotchet) duration sign"
    },
    "luteDurationWhole": {
        "codepoint": "U+EBA7",
        "description": "Whole note (semibreve) duration sign"
    },
    "luteFingeringRHFirst": {
        "codepoint": "U+EBAE",
        "description": "Right-hand fingering, first finger"
    },
    "luteFingeringRHSecond": {
        "codepoint": "U+EBAF",
        "description": "Right-hand fingering, second finger"
    },
    "luteFingeringRHThird": {
        "codepoint": "U+EBB0",
        "description": "Right-hand fingering, third finger"
    },
    "luteFingeringRHThumb": {
        "codepoint": "U+EBAD",
        "description": "Right-hand fingering, thumb"
    },
    "luteFrench10thCourse": {
        "codepoint": "U+EBD0",
        "description": "10th course (diapason)"
    },
    "luteFrench7thCourse": {
        "codepoint": "U+EBCD",
        "description": "Seventh course (diapason)"
    },
    "luteFrench8thCourse": {
        "codepoint": "U+EBCE",
        "description": "Eighth course (diapason)"
    },
    "luteFrench9thCourse": {
        "codepoint": "U+EBCF",
        "description": "Ninth course (diapason)"
    },
    "luteFrenchAppoggiaturaAbove": {
        "codepoint": "U+EBD5",
        "description": "Appoggiatura from above"
    },
    "luteFrenchAppoggiaturaBelow": {
        "codepoint": "U+EBD4",
        "description": "Appoggiatura from below"
    },
    "luteFrenchFretA": {
        "codepoint": "U+EBC0",
        "description": "Open string (a)"
    },
    "luteFrenchFretB": {
        "codepoint": "U+EBC1",
        "description": "First fret (b)"
    },
    "luteFrenchFretC": {
        "codepoint": "U+EBC2",
        "description": "Second fret (c)"
    },
    "luteFrenchFretD": {
        "codepoint": "U+EBC3",
        "description": "Third fret (d)"
    },
    "luteFrenchFretE": {
        "codepoint": "U+EBC4",
        "description": "Fourth fret (e)"
    },
    "luteFrenchFretF": {
        "codepoint": "U+EBC5",
        "description": "Fifth fret (f)"
    },
    "luteFrenchFretG": {
        "codepoint": "U+EBC6",
        "description": "Sixth fret (g)"
    },
    "luteFrenchFretH": {
        "codepoint": "U+EBC7",
        "description": "Seventh fret (h)"
    },
    "luteFrenchFretI": {
        "codepoint": "U+EBC8",
        "description": "Eighth fret (i)"
    },
    "luteFrenchFretK": {
        "codepoint": "U+EBC9",
        "description": "Ninth fret (k)"
    },
    "luteFrenchFretL": {
        "codepoint": "U+EBCA",
        "description": "10th fret (l)"
    },
    "luteFrenchFretM": {
        "codepoint": "U+EBCB",
        "description": "11th fret (m)"
    },
    "luteFrenchFretN": {
        "codepoint": "U+EBCC",
        "description": "12th fret (n)"
    },
    "luteFrenchMordentInverted": {
        "codepoint": "U+EBD3",
        "description": "Inverted mordent"
    },
    "luteFrenchMordentLower": {
        "codepoint": "U+EBD2",
        "description": "Mordent with lower auxiliary"
    },
    "luteFrenchMordentUpper": {
        "codepoint": "U+EBD1",
        "description": "Mordent with upper auxiliary"
    },
    "luteGermanALower": {
        "codepoint": "U+EC00",
        "description": "5th course, 1st fret (a)"
    },
    "luteGermanAUpper": {
        "codepoint": "U+EC17",
        "description": "6th course, 1st fret (A)"
    },
    "luteGermanBLower": {
        "codepoint": "U+EC01",
        "description": "4th course, 1st fret (b)"
    },
    "luteGermanBUpper": {
        "codepoint": "U+EC18",
        "description": "6th course, 2nd fret (B)"
    },
    "luteGermanCLower": {
        "codepoint": "U+EC02",
        "description": "3rd course, 1st fret (c)"
    },
    "luteGermanCUpper": {
        "codepoint": "U+EC19",
        "description": "6th course, 3rd fret (C)"
    },
    "luteGermanDLower": {
        "codepoint": "U+EC03",
        "description": "2nd course, 1st fret (d)"
    },
    "luteGermanDUpper": {
        "codepoint": "U+EC1A",
        "description": "6th course, 4th fret (D)"
    },
    "luteGermanELower": {
        "codepoint": "U+EC04",
        "description": "1st course, 1st fret (e)"
    },
    "luteGermanEUpper": {
        "codepoint": "U+EC1B",
        "description": "6th course, 5th fret (E)"
    },
    "luteGermanFLower": {
        "codepoint": "U+EC05",
        "description": "5th course, 2nd fret (f)"
    },
    "luteGermanFUpper": {
        "codepoint": "U+EC1C",
        "description": "6th course, 6th fret (F)"
    },
    "luteGermanGLower": {
        "codepoint": "U+EC06",
        "description": "4th course, 2nd fret (g)"
    },
    "luteGermanGUpper": {
        "codepoint": "U+EC1D",
        "description": "6th course, 7th fret (G)"
    },
    "luteGermanHLower": {
        "codepoint": "U+EC07",
        "description": "3rd course, 2nd fret (h)"
    },
    "luteGermanHUpper": {
        "codepoint": "U+EC1E",
        "description": "6th course, 8th fret (H)"
    },
    "luteGermanILower": {
        "codepoint": "U+EC08",
        "description": "2nd course, 2nd fret (i)"
    },
    "luteGermanIUpper": {
        "codepoint": "U+EC1F",
        "description": "6th course, 9th fret (I)"
    },
    "luteGermanKLower": {
        "codepoint": "U+EC09",
        "description": "1st course, 2nd fret (k)"
    },
    "luteGermanKUpper": {
        "codepoint": "U+EC20",
        "description": "6th course, 10th fret (K)"
    },
    "luteGermanLLower": {
        "codepoint": "U+EC0A",
        "description": "5th course, 3rd fret (l)"
    },
    "luteGermanLUpper": {
        "codepoint": "U+EC21",
        "description": "6th course, 11th fret (L)"
    },
    "luteGermanMLower": {
        "codepoint": "U+EC0B",
        "description": "4th course, 3rd fret (m)"
    },
    "luteGermanMUpper": {
        "codepoint": "U+EC22",
        "description": "6th course, 12th fret (M)"
    },
    "luteGermanNLower": {
        "codepoint": "U+EC0C",
        "description": "3rd course, 3rd fret (n)"
    },
    "luteGermanNUpper": {
        "codepoint": "U+EC23",
        "description": "6th course, 13th fret (N)"
    },
    "luteGermanOLower": {
        "codepoint": "U+EC0D",
        "description": "2nd course, 3rd fret (o)"
    },
    "luteGermanPLower": {
        "codepoint": "U+EC0E",
        "description": "1st course, 3rd fret (p)"
    },
    "luteGermanQLower": {
        "codepoint": "U+EC0F",
        "description": "5th course, 4th fret (q)"
    },
    "luteGermanRLower": {
        "codepoint": "U+EC10",
        "description": "4th course, 4th fret (r)"
    },
    "luteGermanSLower": {
        "codepoint": "U+EC11",
        "description": "3rd course, 4th fret (s)"
    },
    "luteGermanTLower": {
        "codepoint": "U+EC12",
        "description": "2nd course, 4th fret (t)"
    },
    "luteGermanVLower": {
        "codepoint": "U+EC13",
        "description": "1st course, 4th fret (v)"
    },
    "luteGermanXLower": {
        "codepoint": "U+EC14",
        "description": "5th course, 5th fret (x)"
    },
    "luteGermanYLower": {
        "codepoint": "U+EC15",
        "description": "4th course, 5th fret (y)"
    },
    "luteGermanZLower": {
        "codepoint": "U+EC16",
        "description": "3rd course, 5th fret (z)"
    },
    "luteItalianClefCSolFaUt": {
        "codepoint": "U+EBF1",
        "description": "C sol fa ut clef"
    },
    "luteItalianClefFFaUt": {
        "codepoint": "U+EBF0",
        "description": "F fa ut clef"
    },
    "luteItalianFret0": {
        "codepoint": "U+EBE0",
        "description": "Open string (0)"
    },
    "luteItalianFret1": {
        "codepoint": "U+EBE1",
        "description": "First fret (1)"
    },
    "luteItalianFret2": {
        "codepoint": "U+EBE2",
        "description": "Second fret (2)"
    },
    "luteItalianFret3": {
        "codepoint": "U+EBE3",
        "description": "Third fret (3)"
    },
    "luteItalianFret4": {
        "codepoint": "U+EBE4",
        "description": "Fourth fret (4)"
    },
    "luteItalianFret5": {
        "codepoint": "U+EBE5",
        "description": "Fifth fret (5)"
    },
    "luteItalianFret6": {
        "codepoint": "U+EBE6",
        "description": "Sixth fret (6)"
    },
    "luteItalianFret7": {
        "codepoint": "U+EBE7",
        "description": "Seventh fret (7)"
    },
    "luteItalianFret8": {
        "codepoint": "U+EBE8",
        "description": "Eighth fret (8)"
    },
    "luteItalianFret9": {
        "codepoint": "U+EBE9",
        "description": "Ninth fret (9)"
    },
    "luteItalianHoldFinger": {
        "codepoint": "U+EBF4",
        "description": "Hold finger in place"
    },
    "luteItalianHoldNote": {
        "codepoint": "U+EBF3",
        "description": "Hold note"
    },
    "luteItalianReleaseFinger": {
        "codepoint": "U+EBF5",
        "description": "Release finger"
    },
    "luteItalianTempoFast": {
        "codepoint": "U+EBEA",
        "description": "Fast tempo indication (de Mudarra)"
    },
    "luteItalianTempoNeitherFastNorSlow": {
        "codepoint": "U+EBEC",
        "description": "Neither fast nor slow tempo indication (de Mudarra)"
    },
    "luteItalianTempoSlow": {
        "codepoint": "U+EBED",
        "description": "Slow tempo indication (de Mudarra)"
    },
    "luteItalianTempoSomewhatFast": {
        "codepoint": "U+EBEB",
        "description": "Somewhat fast tempo indication (de Narvaez)"
    },
    "luteItalianTempoVerySlow": {
        "codepoint": "U+EBEE",
        "description": "Very slow indication (de Narvaez)"
    },
    "luteItalianTimeTriple": {
        "codepoint": "U+EBEF",
        "description": "Triple time indication"
    },
    "luteItalianTremolo": {
        "codepoint": "U+EBF2",
        "description": "Single-finger tremolo or mordent"
    },
    "luteItalianVibrato": {
        "codepoint": "U+EBF6",
        "description": "Vibrato (verre cass\u00e9)"
    },
    "luteStaff6Lines": {
        "codepoint": "U+EBA0",
        "description": "Lute tablature staff, 6 courses"
    },
    "luteStaff6LinesNarrow": {
        "codepoint": "U+EBA2",
        "description": "Lute tablature staff, 6 courses (narrow)"
    },
    "luteStaff6LinesWide": {
        "codepoint": "U+EBA1",
        "description": "Lute tablature staff, 6 courses (wide)"
    },
    "lyricsElision": {
        "codepoint": "U+E551",
        "description": "Elision"
    },
    "lyricsElisionNarrow": {
        "codepoint": "U+E550",
        "description": "Narrow elision"
    },
    "lyricsElisionWide": {
        "codepoint": "U+E552",
        "description": "Wide elision"
    },
    "lyricsHyphenBaseline": {
        "codepoint": "U+E553",
        "description": "Baseline hyphen"
    },
    "lyricsHyphenBaselineNonBreaking": {
        "codepoint": "U+E554",
        "description": "Non-breaking baseline hyphen"
    },
    "lyricsTextRepeat": {
        "codepoint": "U+E555",
        "description": "Text repeats"
    },
    "medRenFlatHardB": {
        "codepoint": "U+E9E1",
        "description": "Flat, hard b (mi)"
    },
    "medRenFlatSoftB": {
        "alternateCodepoint": "U+1D1D2",
        "codepoint": "U+E9E0",
        "description": "Flat, soft b (fa)"
    },
    "medRenFlatWithDot": {
        "codepoint": "U+E9E4",
        "description": "Flat with dot"
    },
    "medRenGClefCMN": {
        "codepoint": "U+EA24",
        "description": "G clef (Corpus Monodicum)"
    },
    "medRenLiquescenceCMN": {
        "codepoint": "U+EA22",
        "description": "Liquescence"
    },
    "medRenLiquescentAscCMN": {
        "codepoint": "U+EA26",
        "description": "Liquescent ascending (Corpus Monodicum)"
    },
    "medRenLiquescentDescCMN": {
        "codepoint": "U+EA27",
        "description": "Liquescent descending (Corpus Monodicum)"
    },
    "medRenNatural": {
        "codepoint": "U+E9E2",
        "description": "Natural"
    },
    "medRenNaturalWithCross": {
        "codepoint": "U+E9E5",
        "description": "Natural with interrupted cross"
    },
    "medRenOriscusCMN": {
        "codepoint": "U+EA2A",
        "description": "Oriscus (Corpus Monodicum)"
    },
    "medRenPlicaCMN": {
        "codepoint": "U+EA23",
        "description": "Plica"
    },
    "medRenPunctumCMN": {
        "codepoint": "U+EA25",
        "description": "Punctum (Corpus Monodicum)"
    },
    "medRenQuilismaCMN": {
        "codepoint": "U+EA28",
        "description": "Quilisma (Corpus Monodicum)"
    },
    "medRenSharpCroix": {
        "alternateCodepoint": "U+1D1CF",
        "codepoint": "U+E9E3",
        "description": "Croix"
    },
    "medRenStrophicusCMN": {
        "codepoint": "U+EA29",
        "description": "Strophicus (Corpus Monodicum)"
    },
    "mensuralAlterationSign": {
        "codepoint": "U+EA10",
        "description": "Alteration sign"
    },
    "mensuralBlackBrevis": {
        "codepoint": "U+E952",
        "description": "Black mensural brevis"
    },
    "mensuralBlackBrevisVoid": {
        "codepoint": "U+E956",
        "description": "Black mensural void brevis"
    },
    "mensuralBlackDragma": {
        "codepoint": "U+E95A",
        "description": "Black mensural dragma"
    },
    "mensuralBlackLonga": {
        "codepoint": "U+E951",
        "description": "Black mensural longa"
    },
    "mensuralBlackMaxima": {
        "codepoint": "U+E950",
        "description": "Black mensural maxima"
    },
    "mensuralBlackMinima": {
        "alternateCodepoint": "U+1D1BC",
        "codepoint": "U+E954",
        "description": "Black mensural minima"
    },
    "mensuralBlackMinimaVoid": {
        "alternateCodepoint": "U+1D1BB",
        "codepoint": "U+E958",
        "description": "Black mensural void minima"
    },
    "mensuralBlackSemibrevis": {
        "alternateCodepoint": "U+1D1BA",
        "codepoint": "U+E953",
        "description": "Black mensural semibrevis"
    },
    "mensuralBlackSemibrevisCaudata": {
        "codepoint": "U+E959",
        "description": "Black mensural semibrevis caudata"
    },
    "mensuralBlackSemibrevisOblique": {
        "codepoint": "U+E95B",
        "description": "Black mensural oblique semibrevis"
    },
    "mensuralBlackSemibrevisVoid": {
        "alternateCodepoint": "U+1D1B9",
        "codepoint": "U+E957",
        "description": "Black mensural void semibrevis"
    },
    "mensuralBlackSemiminima": {
        "codepoint": "U+E955",
        "description": "Black mensural semiminima"
    },
    "mensuralCclef": {
        "codepoint": "U+E905",
        "description": "Mensural C clef"
    },
    "mensuralCclefPetrucciPosHigh": {
        "codepoint": "U+E90A",
        "description": "Petrucci C clef, high position"
    },
    "mensuralCclefPetrucciPosHighest": {
        "codepoint": "U+E90B",
        "description": "Petrucci C clef, highest position"
    },
    "mensuralCclefPetrucciPosLow": {
        "codepoint": "U+E908",
        "description": "Petrucci C clef, low position"
    },
    "mensuralCclefPetrucciPosLowest": {
        "codepoint": "U+E907",
        "description": "Petrucci C clef, lowest position"
    },
    "mensuralCclefPetrucciPosMiddle": {
        "codepoint": "U+E909",
        "description": "Petrucci C clef, middle position"
    },
    "mensuralColorationEndRound": {
        "codepoint": "U+EA0F",
        "description": "Coloration end, round"
    },
    "mensuralColorationEndSquare": {
        "codepoint": "U+EA0D",
        "description": "Coloration end, square"
    },
    "mensuralColorationStartRound": {
        "codepoint": "U+EA0E",
        "description": "Coloration start, round"
    },
    "mensuralColorationStartSquare": {
        "codepoint": "U+EA0C",
        "description": "Coloration start, square"
    },
    "mensuralCombStemDiagonal": {
        "codepoint": "U+E940",
        "description": "Combining stem diagonal"
    },
    "mensuralCombStemDown": {
        "codepoint": "U+E93F",
        "description": "Combining stem down"
    },
    "mensuralCombStemDownFlagExtended": {
        "codepoint": "U+E948",
        "description": "Combining stem with extended flag down"
    },
    "mensuralCombStemDownFlagFlared": {
        "codepoint": "U+E946",
        "description": "Combining stem with flared flag down"
    },
    "mensuralCombStemDownFlagFusa": {
        "codepoint": "U+E94C",
        "description": "Combining stem with fusa flag down"
    },
    "mensuralCombStemDownFlagLeft": {
        "codepoint": "U+E944",
        "description": "Combining stem with flag left down"
    },
    "mensuralCombStemDownFlagRight": {
        "codepoint": "U+E942",
        "description": "Combining stem with flag right down"
    },
    "mensuralCombStemDownFlagSemiminima": {
        "codepoint": "U+E94A",
        "description": "Combining stem with semiminima flag down"
    },
    "mensuralCombStemUp": {
        "codepoint": "U+E93E",
        "description": "Combining stem up"
    },
    "mensuralCombStemUpFlagExtended": {
        "codepoint": "U+E947",
        "description": "Combining stem with extended flag up"
    },
    "mensuralCombStemUpFlagFlared": {
        "codepoint": "U+E945",
        "description": "Combining stem with flared flag up"
    },
    "mensuralCombStemUpFlagFusa": {
        "codepoint": "U+E94B",
        "description": "Combining stem with fusa flag up"
    },
    "mensuralCombStemUpFlagLeft": {
        "codepoint": "U+E943",
        "description": "Combining stem with flag left up"
    },
    "mensuralCombStemUpFlagRight": {
        "codepoint": "U+E941",
        "description": "Combining stem with flag right up"
    },
    "mensuralCombStemUpFlagSemiminima": {
        "codepoint": "U+E949",
        "description": "Combining stem with semiminima flag up"
    },
    "mensuralCustosCheckmark": {
        "codepoint": "U+EA0A",
        "description": "Checkmark custos"
    },
    "mensuralCustosDown": {
        "codepoint": "U+EA03",
        "description": "Mensural custos down"
    },
    "mensuralCustosTurn": {
        "codepoint": "U+EA0B",
        "description": "Turn-like custos"
    },
    "mensuralCustosUp": {
        "codepoint": "U+EA02",
        "description": "Mensural custos up"
    },
    "mensuralFclef": {
        "codepoint": "U+E903",
        "description": "Mensural F clef"
    },
    "mensuralFclefPetrucci": {
        "codepoint": "U+E904",
        "description": "Petrucci F clef"
    },
    "mensuralGclef": {
        "codepoint": "U+E900",
        "description": "Mensural G clef"
    },
    "mensuralGclefPetrucci": {
        "codepoint": "U+E901",
        "description": "Petrucci G clef"
    },
    "mensuralModusImperfectumVert": {
        "codepoint": "U+E92D",
        "description": "Modus imperfectum, vertical"
    },
    "mensuralModusPerfectumVert": {
        "codepoint": "U+E92C",
        "description": "Modus perfectum, vertical"
    },
    "mensuralNoteheadLongaBlack": {
        "codepoint": "U+E934",
        "description": "Longa/brevis notehead, black"
    },
    "mensuralNoteheadLongaBlackVoid": {
        "codepoint": "U+E936",
        "description": "Longa/brevis notehead, black and void"
    },
    "mensuralNoteheadLongaVoid": {
        "alternateCodepoint": "U+1D1B7",
        "codepoint": "U+E935",
        "description": "Longa/brevis notehead, void"
    },
    "mensuralNoteheadLongaWhite": {
        "codepoint": "U+E937",
        "description": "Longa/brevis notehead, white"
    },
    "mensuralNoteheadMaximaBlack": {
        "codepoint": "U+E930",
        "description": "Maxima notehead, black"
    },
    "mensuralNoteheadMaximaBlackVoid": {
        "codepoint": "U+E932",
        "description": "Maxima notehead, black and void"
    },
    "mensuralNoteheadMaximaVoid": {
        "alternateCodepoint": "U+1D1B6",
        "codepoint": "U+E931",
        "description": "Maxima notehead, void"
    },
    "mensuralNoteheadMaximaWhite": {
        "codepoint": "U+E933",
        "description": "Maxima notehead, white"
    },
    "mensuralNoteheadMinimaWhite": {
        "codepoint": "U+E93C",
        "description": "Minima notehead, white"
    },
    "mensuralNoteheadSemibrevisBlack": {
        "alternateCodepoint": "U+1D1BA",
        "codepoint": "U+E938",
        "description": "Semibrevis notehead, black"
    },
    "mensuralNoteheadSemibrevisBlackVoid": {
        "codepoint": "U+E93A",
        "description": "Semibrevis notehead, black and void"
    },
    "mensuralNoteheadSemibrevisBlackVoidTurned": {
        "codepoint": "U+E93B",
        "description": "Semibrevis notehead, black and void (turned)"
    },
    "mensuralNoteheadSemibrevisVoid": {
        "alternateCodepoint": "U+1D1B9",
        "codepoint": "U+E939",
        "description": "Semibrevis notehead, void"
    },
    "mensuralNoteheadSemiminimaWhite": {
        "codepoint": "U+E93D",
        "description": "Semiminima/fusa notehead, white"
    },
    "mensuralObliqueAsc2ndBlack": {
        "codepoint": "U+E970",
        "description": "Oblique form, ascending 2nd, black"
    },
    "mensuralObliqueAsc2ndBlackVoid": {
        "codepoint": "U+E972",
        "description": "Oblique form, ascending 2nd, black and void"
    },
    "mensuralObliqueAsc2ndVoid": {
        "codepoint": "U+E971",
        "description": "Oblique form, ascending 2nd, void"
    },
    "mensuralObliqueAsc2ndWhite": {
        "codepoint": "U+E973",
        "description": "Oblique form, ascending 2nd, white"
    },
    "mensuralObliqueAsc3rdBlack": {
        "codepoint": "U+E974",
        "description": "Oblique form, ascending 3rd, black"
    },
    "mensuralObliqueAsc3rdBlackVoid": {
        "codepoint": "U+E976",
        "description": "Oblique form, ascending 3rd, black and void"
    },
    "mensuralObliqueAsc3rdVoid": {
        "codepoint": "U+E975",
        "description": "Oblique form, ascending 3rd, void"
    },
    "mensuralObliqueAsc3rdWhite": {
        "codepoint": "U+E977",
        "description": "Oblique form, ascending 3rd, white"
    },
    "mensuralObliqueAsc4thBlack": {
        "codepoint": "U+E978",
        "description": "Oblique form, ascending 4th, black"
    },
    "mensuralObliqueAsc4thBlackVoid": {
        "codepoint": "U+E97A",
        "description": "Oblique form, ascending 4th, black and void"
    },
    "mensuralObliqueAsc4thVoid": {
        "codepoint": "U+E979",
        "description": "Oblique form, ascending 4th, void"
    },
    "mensuralObliqueAsc4thWhite": {
        "codepoint": "U+E97B",
        "description": "Oblique form, ascending 4th, white"
    },
    "mensuralObliqueAsc5thBlack": {
        "codepoint": "U+E97C",
        "description": "Oblique form, ascending 5th, black"
    },
    "mensuralObliqueAsc5thBlackVoid": {
        "codepoint": "U+E97E",
        "description": "Oblique form, ascending 5th, black and void"
    },
    "mensuralObliqueAsc5thVoid": {
        "codepoint": "U+E97D",
        "description": "Oblique form, ascending 5th, void"
    },
    "mensuralObliqueAsc5thWhite": {
        "codepoint": "U+E97F",
        "description": "Oblique form, ascending 5th, white"
    },
    "mensuralObliqueDesc2ndBlack": {
        "codepoint": "U+E980",
        "description": "Oblique form, descending 2nd, black"
    },
    "mensuralObliqueDesc2ndBlackVoid": {
        "codepoint": "U+E982",
        "description": "Oblique form, descending 2nd, black and void"
    },
    "mensuralObliqueDesc2ndVoid": {
        "codepoint": "U+E981",
        "description": "Oblique form, descending 2nd, void"
    },
    "mensuralObliqueDesc2ndWhite": {
        "codepoint": "U+E983",
        "description": "Oblique form, descending 2nd, white"
    },
    "mensuralObliqueDesc3rdBlack": {
        "codepoint": "U+E984",
        "description": "Oblique form, descending 3rd, black"
    },
    "mensuralObliqueDesc3rdBlackVoid": {
        "codepoint": "U+E986",
        "description": "Oblique form, descending 3rd, black and void"
    },
    "mensuralObliqueDesc3rdVoid": {
        "codepoint": "U+E985",
        "description": "Oblique form, descending 3rd, void"
    },
    "mensuralObliqueDesc3rdWhite": {
        "codepoint": "U+E987",
        "description": "Oblique form, descending 3rd, white"
    },
    "mensuralObliqueDesc4thBlack": {
        "codepoint": "U+E988",
        "description": "Oblique form, descending 4th, black"
    },
    "mensuralObliqueDesc4thBlackVoid": {
        "codepoint": "U+E98A",
        "description": "Oblique form, descending 4th, black and void"
    },
    "mensuralObliqueDesc4thVoid": {
        "codepoint": "U+E989",
        "description": "Oblique form, descending 4th, void"
    },
    "mensuralObliqueDesc4thWhite": {
        "codepoint": "U+E98B",
        "description": "Oblique form, descending 4th, white"
    },
    "mensuralObliqueDesc5thBlack": {
        "codepoint": "U+E98C",
        "description": "Oblique form, descending 5th, black"
    },
    "mensuralObliqueDesc5thBlackVoid": {
        "codepoint": "U+E98E",
        "description": "Oblique form, descending 5th, black and void"
    },
    "mensuralObliqueDesc5thVoid": {
        "codepoint": "U+E98D",
        "description": "Oblique form, descending 5th, void"
    },
    "mensuralObliqueDesc5thWhite": {
        "codepoint": "U+E98F",
        "description": "Oblique form, descending 5th, white"
    },
    "mensuralProlation1": {
        "alternateCodepoint": "U+1D1C7",
        "codepoint": "U+E910",
        "description": "Tempus perfectum cum prolatione perfecta (9/8)"
    },
    "mensuralProlation10": {
        "alternateCodepoint": "U+1D1CE",
        "codepoint": "U+E919",
        "description": "Tempus imperfectum cum prolatione imperfecta diminution 4"
    },
    "mensuralProlation11": {
        "codepoint": "U+E91A",
        "description": "Tempus imperfectum cum prolatione imperfecta diminution 5"
    },
    "mensuralProlation2": {
        "alternateCodepoint": "U+1D1C8",
        "codepoint": "U+E911",
        "description": "Tempus perfectum cum prolatione imperfecta (3/4)"
    },
    "mensuralProlation3": {
        "alternateCodepoint": "U+1D1C9",
        "codepoint": "U+E912",
        "description": "Tempus perfectum cum prolatione imperfecta diminution 1 (3/8)"
    },
    "mensuralProlation4": {
        "codepoint": "U+E913",
        "description": "Tempus perfectum cum prolatione perfecta diminution 2 (9/16)"
    },
    "mensuralProlation5": {
        "alternateCodepoint": "U+1D1CA",
        "codepoint": "U+E914",
        "description": "Tempus imperfectum cum prolatione perfecta (6/8)"
    },
    "mensuralProlation6": {
        "alternateCodepoint": "U+1D1CB",
        "codepoint": "U+E915",
        "description": "Tempus imperfectum cum prolatione imperfecta (2/4)"
    },
    "mensuralProlation7": {
        "alternateCodepoint": "U+1D1CC",
        "codepoint": "U+E916",
        "description": "Tempus imperfectum cum prolatione imperfecta diminution 1 (2/2)"
    },
    "mensuralProlation8": {
        "codepoint": "U+E917",
        "description": "Tempus imperfectum cum prolatione imperfecta diminution 2 (6/16)"
    },
    "mensuralProlation9": {
        "alternateCodepoint": "U+1D1CD",
        "codepoint": "U+E918",
        "description": "Tempus imperfectum cum prolatione imperfecta diminution 3 (2/2)"
    },
    "mensuralProlationCombiningDot": {
        "codepoint": "U+E920",
        "description": "Combining dot"
    },
    "mensuralProlationCombiningDotVoid": {
        "codepoint": "U+E924",
        "description": "Combining void dot"
    },
    "mensuralProlationCombiningStroke": {
        "codepoint": "U+E925",
        "description": "Combining vertical stroke"
    },
    "mensuralProlationCombiningThreeDots": {
        "codepoint": "U+E922",
        "description": "Combining three dots horizontal"
    },
    "mensuralProlationCombiningThreeDotsTri": {
        "codepoint": "U+E923",
        "description": "Combining three dots triangular"
    },
    "mensuralProlationCombiningTwoDots": {
        "codepoint": "U+E921",
        "description": "Combining two dots"
    },
    "mensuralProportion1": {
        "codepoint": "U+E926",
        "description": "Mensural proportion 1"
    },
    "mensuralProportion2": {
        "codepoint": "U+E927",
        "description": "Mensural proportion 2"
    },
    "mensuralProportion3": {
        "codepoint": "U+E928",
        "description": "Mensural proportion 3"
    },
    "mensuralProportion4": {
        "codepoint": "U+E929",
        "description": "Mensural proportion 4"
    },
    "mensuralProportionMajor": {
        "codepoint": "U+E92B",
        "description": "Mensural proportion major"
    },
    "mensuralProportionMinor": {
        "codepoint": "U+E92A",
        "description": "Mensural proportion minor"
    },
    "mensuralProportionProportioDupla1": {
        "codepoint": "U+E91C",
        "description": "Proportio dupla 1"
    },
    "mensuralProportionProportioDupla2": {
        "codepoint": "U+E91D",
        "description": "Proportio dupla 2"
    },
    "mensuralProportionProportioQuadrupla": {
        "codepoint": "U+E91F",
        "description": "Proportio quadrupla"
    },
    "mensuralProportionProportioTripla": {
        "codepoint": "U+E91E",
        "description": "Proportio tripla"
    },
    "mensuralProportionTempusPerfectum": {
        "codepoint": "U+E91B",
        "description": "Tempus perfectum"
    },
    "mensuralRestBrevis": {
        "alternateCodepoint": "U+1D1C3",
        "codepoint": "U+E9F3",
        "description": "Brevis rest"
    },
    "mensuralRestFusa": {
        "codepoint": "U+E9F7",
        "description": "Fusa rest"
    },
    "mensuralRestLongaImperfecta": {
        "alternateCodepoint": "U+1D1C2",
        "codepoint": "U+E9F2",
        "description": "Longa imperfecta rest"
    },
    "mensuralRestLongaPerfecta": {
        "alternateCodepoint": "U+1D1C1",
        "codepoint": "U+E9F1",
        "description": "Longa perfecta rest"
    },
    "mensuralRestMaxima": {
        "codepoint": "U+E9F0",
        "description": "Maxima rest"
    },
    "mensuralRestMinima": {
        "alternateCodepoint": "U+1D1C5",
        "codepoint": "U+E9F5",
        "description": "Minima rest"
    },
    "mensuralRestSemibrevis": {
        "alternateCodepoint": "U+1D1C4",
        "codepoint": "U+E9F4",
        "description": "Semibrevis rest"
    },
    "mensuralRestSemifusa": {
        "codepoint": "U+E9F8",
        "description": "Semifusa rest"
    },
    "mensuralRestSemiminima": {
        "alternateCodepoint": "U+1D1C6",
        "codepoint": "U+E9F6",
        "description": "Semiminima rest"
    },
    "mensuralSignumDown": {
        "codepoint": "U+EA01",
        "description": "Signum congruentiae down"
    },
    "mensuralSignumUp": {
        "codepoint": "U+EA00",
        "description": "Signum congruentiae up"
    },
    "mensuralTempusImperfectumHoriz": {
        "codepoint": "U+E92F",
        "description": "Tempus imperfectum, horizontal"
    },
    "mensuralTempusPerfectumHoriz": {
        "codepoint": "U+E92E",
        "description": "Tempus perfectum, horizontal"
    },
    "mensuralWhiteBrevis": {
        "alternateCodepoint": "U+1D1B8",
        "codepoint": "U+E95E",
        "description": "White mensural brevis"
    },
    "mensuralWhiteFusa": {
        "alternateCodepoint": "U+1D1BE",
        "codepoint": "U+E961",
        "description": "White mensural fusa"
    },
    "mensuralWhiteLonga": {
        "alternateCodepoint": "U+1D1B7",
        "codepoint": "U+E95D",
        "description": "White mensural longa"
    },
    "mensuralWhiteMaxima": {
        "alternateCodepoint": "U+1D1B6",
        "codepoint": "U+E95C",
        "description": "White mensural maxima"
    },
    "mensuralWhiteMinima": {
        "codepoint": "U+E95F",
        "description": "White mensural minima"
    },
    "mensuralWhiteSemiminima": {
        "alternateCodepoint": "U+1D1BC",
        "codepoint": "U+E960",
        "description": "White mensural semiminima"
    },
    "metAugmentationDot": {
        "codepoint": "U+ECB7",
        "description": "Augmentation dot"
    },
    "metNote1024thDown": {
        "codepoint": "U+ECB6",
        "description": "1024th note (semihemidemisemihemidemisemiquaver) stem down"
    },
    "metNote1024thUp": {
        "codepoint": "U+ECB5",
        "description": "1024th note (semihemidemisemihemidemisemiquaver) stem up"
    },
    "metNote128thDown": {
        "codepoint": "U+ECB0",
        "description": "128th note (semihemidemisemiquaver) stem down"
    },
    "metNote128thUp": {
        "codepoint": "U+ECAF",
        "description": "128th note (semihemidemisemiquaver) stem up"
    },
    "metNote16thDown": {
        "codepoint": "U+ECAA",
        "description": "16th note (semiquaver) stem down"
    },
    "metNote16thUp": {
        "codepoint": "U+ECA9",
        "description": "16th note (semiquaver) stem up"
    },
    "metNote256thDown": {
        "codepoint": "U+ECB2",
        "description": "256th note (demisemihemidemisemiquaver) stem down"
    },
    "metNote256thUp": {
        "codepoint": "U+ECB1",
        "description": "256th note (demisemihemidemisemiquaver) stem up"
    },
    "metNote32ndDown": {
        "codepoint": "U+ECAC",
        "description": "32nd note (demisemiquaver) stem down"
    },
    "metNote32ndUp": {
        "codepoint": "U+ECAB",
        "description": "32nd note (demisemiquaver) stem up"
    },
    "metNote512thDown": {
        "codepoint": "U+ECB4",
        "description": "512th note (hemidemisemihemidemisemiquaver) stem down"
    },
    "metNote512thUp": {
        "codepoint": "U+ECB3",
        "description": "512th note (hemidemisemihemidemisemiquaver) stem up"
    },
    "metNote64thDown": {
        "codepoint": "U+ECAE",
        "description": "64th note (hemidemisemiquaver) stem down"
    },
    "metNote64thUp": {
        "codepoint": "U+ECAD",
        "description": "64th note (hemidemisemiquaver) stem up"
    },
    "metNote8thDown": {
        "codepoint": "U+ECA8",
        "description": "Eighth note (quaver) stem down"
    },
    "metNote8thUp": {
        "codepoint": "U+ECA7",
        "description": "Eighth note (quaver) stem up"
    },
    "metNoteDoubleWhole": {
        "codepoint": "U+ECA0",
        "description": "Double whole note (breve)"
    },
    "metNoteDoubleWholeSquare": {
        "codepoint": "U+ECA1",
        "description": "Double whole note (square)"
    },
    "metNoteHalfDown": {
        "codepoint": "U+ECA4",
        "description": "Half note (minim) stem down"
    },
    "metNoteHalfUp": {
        "codepoint": "U+ECA3",
        "description": "Half note (minim) stem up"
    },
    "metNoteQuarterDown": {
        "codepoint": "U+ECA6",
        "description": "Quarter note (crotchet) stem down"
    },
    "metNoteQuarterUp": {
        "codepoint": "U+ECA5",
        "description": "Quarter note (crotchet) stem up"
    },
    "metNoteWhole": {
        "codepoint": "U+ECA2",
        "description": "Whole note (semibreve)"
    },
    "metricModulationArrowLeft": {
        "codepoint": "U+EC63",
        "description": "Left-pointing arrow for metric modulation"
    },
    "metricModulationArrowRight": {
        "codepoint": "U+EC64",
        "description": "Right-pointing arrow for metric modulation"
    },
    "miscDoNotCopy": {
        "codepoint": "U+EC61",
        "description": "Do not copy"
    },
    "miscDoNotPhotocopy": {
        "codepoint": "U+EC60",
        "description": "Do not photocopy"
    },
    "miscEyeglasses": {
        "codepoint": "U+EC62",
        "description": "Eyeglasses"
    },
    "note1024thDown": {
        "codepoint": "U+E1E6",
        "description": "1024th note (semihemidemisemihemidemisemiquaver) stem down"
    },
    "note1024thUp": {
        "codepoint": "U+E1E5",
        "description": "1024th note (semihemidemisemihemidemisemiquaver) stem up"
    },
    "note128thDown": {
        "codepoint": "U+E1E0",
        "description": "128th note (semihemidemisemiquaver) stem down"
    },
    "note128thUp": {
        "alternateCodepoint": "U+1D164",
        "codepoint": "U+E1DF",
        "description": "128th note (semihemidemisemiquaver) stem up"
    },
    "note16thDown": {
        "codepoint": "U+E1DA",
        "description": "16th note (semiquaver) stem down"
    },
    "note16thUp": {
        "alternateCodepoint": "U+1D161",
        "codepoint": "U+E1D9",
        "description": "16th note (semiquaver) stem up"
    },
    "note256thDown": {
        "codepoint": "U+E1E2",
        "description": "256th note (demisemihemidemisemiquaver) stem down"
    },
    "note256thUp": {
        "codepoint": "U+E1E1",
        "description": "256th note (demisemihemidemisemiquaver) stem up"
    },
    "note32ndDown": {
        "codepoint": "U+E1DC",
        "description": "32nd note (demisemiquaver) stem down"
    },
    "note32ndUp": {
        "alternateCodepoint": "U+1D162",
        "codepoint": "U+E1DB",
        "description": "32nd note (demisemiquaver) stem up"
    },
    "note512thDown": {
        "codepoint": "U+E1E4",
        "description": "512th note (hemidemisemihemidemisemiquaver) stem down"
    },
    "note512thUp": {
        "codepoint": "U+E1E3",
        "description": "512th note (hemidemisemihemidemisemiquaver) stem up"
    },
    "note64thDown": {
        "codepoint": "U+E1DE",
        "description": "64th note (hemidemisemiquaver) stem down"
    },
    "note64thUp": {
        "alternateCodepoint": "U+1D163",
        "codepoint": "U+E1DD",
        "description": "64th note (hemidemisemiquaver) stem up"
    },
    "note8thDown": {
        "codepoint": "U+E1D8",
        "description": "Eighth note (quaver) stem down"
    },
    "note8thUp": {
        "alternateCodepoint": "U+1D160",
        "codepoint": "U+E1D7",
        "description": "Eighth note (quaver) stem up"
    },
    "noteABlack": {
        "codepoint": "U+E197",
        "description": "A (black note)"
    },
    "noteAFlatBlack": {
        "codepoint": "U+E196",
        "description": "A flat (black note)"
    },
    "noteAFlatHalf": {
        "codepoint": "U+E17F",
        "description": "A flat (half note)"
    },
    "noteAFlatWhole": {
        "codepoint": "U+E168",
        "description": "A flat (whole note)"
    },
    "noteAHalf": {
        "codepoint": "U+E180",
        "description": "A (half note)"
    },
    "noteASharpBlack": {
        "codepoint": "U+E198",
        "description": "A sharp (black note)"
    },
    "noteASharpHalf": {
        "codepoint": "U+E181",
        "description": "A sharp (half note)"
    },
    "noteASharpWhole": {
        "codepoint": "U+E16A",
        "description": "A sharp (whole note)"
    },
    "noteAWhole": {
        "codepoint": "U+E169",
        "description": "A (whole note)"
    },
    "noteBBlack": {
        "codepoint": "U+E19A",
        "description": "B (black note)"
    },
    "noteBFlatBlack": {
        "codepoint": "U+E199",
        "description": "B flat (black note)"
    },
    "noteBFlatHalf": {
        "codepoint": "U+E182",
        "description": "B flat (half note)"
    },
    "noteBFlatWhole": {
        "codepoint": "U+E16B",
        "description": "B flat (whole note)"
    },
    "noteBHalf": {
        "codepoint": "U+E183",
        "description": "B (half note)"
    },
    "noteBSharpBlack": {
        "codepoint": "U+E19B",
        "description": "B sharp (black note)"
    },
    "noteBSharpHalf": {
        "codepoint": "U+E184",
        "description": "B sharp (half note)"
    },
    "noteBSharpWhole": {
        "codepoint": "U+E16D",
        "description": "B sharp (whole note)"
    },
    "noteBWhole": {
        "codepoint": "U+E16C",
        "description": "B (whole note)"
    },
    "noteCBlack": {
        "codepoint": "U+E19D",
        "description": "C (black note)"
    },
    "noteCFlatBlack": {
        "codepoint": "U+E19C",
        "description": "C flat (black note)"
    },
    "noteCFlatHalf": {
        "codepoint": "U+E185",
        "description": "C flat (half note)"
    },
    "noteCFlatWhole": {
        "codepoint": "U+E16E",
        "description": "C flat (whole note)"
    },
    "noteCHalf": {
        "codepoint": "U+E186",
        "description": "C (half note)"
    },
    "noteCSharpBlack": {
        "codepoint": "U+E19E",
        "description": "C sharp (black note)"
    },
    "noteCSharpHalf": {
        "codepoint": "U+E187",
        "description": "C sharp (half note)"
    },
    "noteCSharpWhole": {
        "codepoint": "U+E170",
        "description": "C sharp (whole note)"
    },
    "noteCWhole": {
        "codepoint": "U+E16F",
        "description": "C (whole note)"
    },
    "noteDBlack": {
        "codepoint": "U+E1A0",
        "description": "D (black note)"
    },
    "noteDFlatBlack": {
        "codepoint": "U+E19F",
        "description": "D flat (black note)"
    },
    "noteDFlatHalf": {
        "codepoint": "U+E188",
        "description": "D flat (half note)"
    },
    "noteDFlatWhole": {
        "codepoint": "U+E171",
        "description": "D flat (whole note)"
    },
    "noteDHalf": {
        "codepoint": "U+E189",
        "description": "D (half note)"
    },
    "noteDSharpBlack": {
        "codepoint": "U+E1A1",
        "description": "D sharp (black note)"
    },
    "noteDSharpHalf": {
        "codepoint": "U+E18A",
        "description": "D sharp (half note)"
    },
    "noteDSharpWhole": {
        "codepoint": "U+E173",
        "description": "D sharp (whole note)"
    },
    "noteDWhole": {
        "codepoint": "U+E172",
        "description": "D (whole note)"
    },
    "noteDoBlack": {
        "codepoint": "U+E160",
        "description": "Do (black note)"
    },
    "noteDoHalf": {
        "codepoint": "U+E158",
        "description": "Do (half note)"
    },
    "noteDoWhole": {
        "codepoint": "U+E150",
        "description": "Do (whole note)"
    },
    "noteDoubleWhole": {
        "alternateCodepoint": "U+1D15C",
        "codepoint": "U+E1D0",
        "description": "Double whole note (breve)"
    },
    "noteDoubleWholeSquare": {
        "codepoint": "U+E1D1",
        "description": "Double whole note (square)"
    },
    "noteEBlack": {
        "codepoint": "U+E1A3",
        "description": "E (black note)"
    },
    "noteEFlatBlack": {
        "codepoint": "U+E1A2",
        "description": "E flat (black note)"
    },
    "noteEFlatHalf": {
        "codepoint": "U+E18B",
        "description": "E flat (half note)"
    },
    "noteEFlatWhole": {
        "codepoint": "U+E174",
        "description": "E flat (whole note)"
    },
    "noteEHalf": {
        "codepoint": "U+E18C",
        "description": "E (half note)"
    },
    "noteESharpBlack": {
        "codepoint": "U+E1A4",
        "description": "E sharp (black note)"
    },
    "noteESharpHalf": {
        "codepoint": "U+E18D",
        "description": "E sharp (half note)"
    },
    "noteESharpWhole": {
        "codepoint": "U+E176",
        "description": "E sharp (whole note)"
    },
    "noteEWhole": {
        "codepoint": "U+E175",
        "description": "E (whole note)"
    },
    "noteEmptyBlack": {
        "codepoint": "U+E1AF",
        "description": "Empty black note"
    },
    "noteEmptyHalf": {
        "codepoint": "U+E1AE",
        "description": "Empty half note"
    },
    "noteEmptyWhole": {
        "codepoint": "U+E1AD",
        "description": "Empty whole note"
    },
    "noteFBlack": {
        "codepoint": "U+E1A6",
        "description": "F (black note)"
    },
    "noteFFlatBlack": {
        "codepoint": "U+E1A5",
        "description": "F flat (black note)"
    },
    "noteFFlatHalf": {
        "codepoint": "U+E18E",
        "description": "F flat (half note)"
    },
    "noteFFlatWhole": {
        "codepoint": "U+E177",
        "description": "F flat (whole note)"
    },
    "noteFHalf": {
        "codepoint": "U+E18F",
        "description": "F (half note)"
    },
    "noteFSharpBlack": {
        "codepoint": "U+E1A7",
        "description": "F sharp (black note)"
    },
    "noteFSharpHalf": {
        "codepoint": "U+E190",
        "description": "F sharp (half note)"
    },
    "noteFSharpWhole": {
        "codepoint": "U+E179",
        "description": "F sharp (whole note)"
    },
    "noteFWhole": {
        "codepoint": "U+E178",
        "description": "F (whole note)"
    },
    "noteFaBlack": {
        "codepoint": "U+E163",
        "description": "Fa (black note)"
    },
    "noteFaHalf": {
        "codepoint": "U+E15B",
        "description": "Fa (half note)"
    },
    "noteFaWhole": {
        "codepoint": "U+E153",
        "description": "Fa (whole note)"
    },
    "noteGBlack": {
        "codepoint": "U+E1A9",
        "description": "G (black note)"
    },
    "noteGFlatBlack": {
        "codepoint": "U+E1A8",
        "description": "G flat (black note)"
    },
    "noteGFlatHalf": {
        "codepoint": "U+E191",
        "description": "G flat (half note)"
    },
    "noteGFlatWhole": {
        "codepoint": "U+E17A",
        "description": "G flat (whole note)"
    },
    "noteGHalf": {
        "codepoint": "U+E192",
        "description": "G (half note)"
    },
    "noteGSharpBlack": {
        "codepoint": "U+E1AA",
        "description": "G sharp (black note)"
    },
    "noteGSharpHalf": {
        "codepoint": "U+E193",
        "description": "G sharp (half note)"
    },
    "noteGSharpWhole": {
        "codepoint": "U+E17C",
        "description": "G sharp (whole note)"
    },
    "noteGWhole": {
        "codepoint": "U+E17B",
        "description": "G (whole note)"
    },
    "noteHBlack": {
        "codepoint": "U+E1AB",
        "description": "H (black note)"
    },
    "noteHHalf": {
        "codepoint": "U+E194",
        "description": "H (half note)"
    },
    "noteHSharpBlack": {
        "codepoint": "U+E1AC",
        "description": "H sharp (black note)"
    },
    "noteHSharpHalf": {
        "codepoint": "U+E195",
        "description": "H sharp (half note)"
    },
    "noteHSharpWhole": {
        "codepoint": "U+E17E",
        "description": "H sharp (whole note)"
    },
    "noteHWhole": {
        "codepoint": "U+E17D",
        "description": "H (whole note)"
    },
    "noteHalfDown": {
        "codepoint": "U+E1D4",
        "description": "Half note (minim) stem down"
    },
    "noteHalfUp": {
        "alternateCodepoint": "U+1D15E",
        "codepoint": "U+E1D3",
        "description": "Half note (minim) stem up"
    },
    "noteLaBlack": {
        "codepoint": "U+E165",
        "description": "La (black note)"
    },
    "noteLaHalf": {
        "codepoint": "U+E15D",
        "description": "La (half note)"
    },
    "noteLaWhole": {
        "codepoint": "U+E155",
        "description": "La (whole note)"
    },
    "noteMiBlack": {
        "codepoint": "U+E162",
        "description": "Mi (black note)"
    },
    "noteMiHalf": {
        "codepoint": "U+E15A",
        "description": "Mi (half note)"
    },
    "noteMiWhole": {
        "codepoint": "U+E152",
        "description": "Mi (whole note)"
    },
    "noteQuarterDown": {
        "codepoint": "U+E1D6",
        "description": "Quarter note (crotchet) stem down"
    },
    "noteQuarterUp": {
        "alternateCodepoint": "U+1D15F",
        "codepoint": "U+E1D5",
        "description": "Quarter note (crotchet) stem up"
    },
    "noteReBlack": {
        "codepoint": "U+E161",
        "description": "Re (black note)"
    },
    "noteReHalf": {
        "codepoint": "U+E159",
        "description": "Re (half note)"
    },
    "noteReWhole": {
        "codepoint": "U+E151",
        "description": "Re (whole note)"
    },
    "noteShapeArrowheadLeftBlack": {
        "codepoint": "U+E1C9",
        "description": "Arrowhead left black (Funk 7-shape re)"
    },
    "noteShapeArrowheadLeftDoubleWhole": {
        "codepoint": "U+ECDC",
        "description": "Arrowhead left double whole (Funk 7-shape re)"
    },
    "noteShapeArrowheadLeftWhite": {
        "codepoint": "U+E1C8",
        "description": "Arrowhead left white (Funk 7-shape re)"
    },
    "noteShapeDiamondBlack": {
        "codepoint": "U+E1B9",
        "description": "Diamond black (4-shape mi; 7-shape mi)"
    },
    "noteShapeDiamondDoubleWhole": {
        "codepoint": "U+ECD4",
        "description": "Diamond double whole (4-shape mi; 7-shape mi)"
    },
    "noteShapeDiamondWhite": {
        "codepoint": "U+E1B8",
        "description": "Diamond white (4-shape mi; 7-shape mi)"
    },
    "noteShapeIsoscelesTriangleBlack": {
        "codepoint": "U+E1C5",
        "description": "Isosceles triangle black (Walker 7-shape ti)"
    },
    "noteShapeIsoscelesTriangleDoubleWhole": {
        "codepoint": "U+ECDA",
        "description": "Isosceles triangle double whole (Walker 7-shape ti)"
    },
    "noteShapeIsoscelesTriangleWhite": {
        "codepoint": "U+E1C4",
        "description": "Isosceles triangle white (Walker 7-shape ti)"
    },
    "noteShapeKeystoneBlack": {
        "codepoint": "U+E1C1",
        "description": "Inverted keystone black (Walker 7-shape do)"
    },
    "noteShapeKeystoneDoubleWhole": {
        "codepoint": "U+ECD8",
        "description": "Inverted keystone double whole (Walker 7-shape do)"
    },
    "noteShapeKeystoneWhite": {
        "codepoint": "U+E1C0",
        "description": "Inverted keystone white (Walker 7-shape do)"
    },
    "noteShapeMoonBlack": {
        "codepoint": "U+E1BD",
        "description": "Moon black (Aikin 7-shape re)"
    },
    "noteShapeMoonDoubleWhole": {
        "codepoint": "U+ECD6",
        "description": "Moon double whole (Aikin 7-shape re)"
    },
    "noteShapeMoonLeftBlack": {
        "codepoint": "U+E1C7",
        "description": "Moon left black (Funk 7-shape do)"
    },
    "noteShapeMoonLeftDoubleWhole": {
        "codepoint": "U+ECDB",
        "description": "Moon left double whole (Funk 7-shape do)"
    },
    "noteShapeMoonLeftWhite": {
        "codepoint": "U+E1C6",
        "description": "Moon left white (Funk 7-shape do)"
    },
    "noteShapeMoonWhite": {
        "codepoint": "U+E1BC",
        "description": "Moon white (Aikin 7-shape re)"
    },
    "noteShapeQuarterMoonBlack": {
        "codepoint": "U+E1C3",
        "description": "Quarter moon black (Walker 7-shape re)"
    },
    "noteShapeQuarterMoonDoubleWhole": {
        "codepoint": "U+ECD9",
        "description": "Quarter moon double whole (Walker 7-shape re)"
    },
    "noteShapeQuarterMoonWhite": {
        "codepoint": "U+E1C2",
        "description": "Quarter moon white (Walker 7-shape re)"
    },
    "noteShapeRoundBlack": {
        "codepoint": "U+E1B1",
        "description": "Round black (4-shape sol; 7-shape so)"
    },
    "noteShapeRoundDoubleWhole": {
        "codepoint": "U+ECD0",
        "description": "Round double whole (4-shape sol; 7-shape so)"
    },
    "noteShapeRoundWhite": {
        "codepoint": "U+E1B0",
        "description": "Round white (4-shape sol; 7-shape so)"
    },
    "noteShapeSquareBlack": {
        "codepoint": "U+E1B3",
        "description": "Square black (4-shape la; Aikin 7-shape la)"
    },
    "noteShapeSquareDoubleWhole": {
        "codepoint": "U+ECD1",
        "description": "Square double whole (4-shape la; Aikin 7-shape la)"
    },
    "noteShapeSquareWhite": {
        "codepoint": "U+E1B2",
        "description": "Square white (4-shape la; Aikin 7-shape la)"
    },
    "noteShapeTriangleLeftBlack": {
        "codepoint": "U+E1B7",
        "description": "Triangle left black (stem up; 4-shape fa; 7-shape fa)"
    },
    "noteShapeTriangleLeftDoubleWhole": {
        "codepoint": "U+ECD3",
        "description": "Triangle left double whole (stem up; 4-shape fa; 7-shape fa)"
    },
    "noteShapeTriangleLeftWhite": {
        "codepoint": "U+E1B6",
        "description": "Triangle left white (stem up; 4-shape fa; 7-shape fa)"
    },
    "noteShapeTriangleRightBlack": {
        "codepoint": "U+E1B5",
        "description": "Triangle right black (stem down; 4-shape fa; 7-shape fa)"
    },
    "noteShapeTriangleRightDoubleWhole": {
        "codepoint": "U+ECD2",
        "description": "Triangle right double whole (stem down; 4-shape fa; 7-shape fa)"
    },
    "noteShapeTriangleRightWhite": {
        "codepoint": "U+E1B4",
        "description": "Triangle right white (stem down; 4-shape fa; 7-shape fa)"
    },
    "noteShapeTriangleRoundBlack": {
        "codepoint": "U+E1BF",
        "description": "Triangle-round black (Aikin 7-shape ti)"
    },
    "noteShapeTriangleRoundDoubleWhole": {
        "codepoint": "U+ECD7",
        "description": "Triangle-round white (Aikin 7-shape ti)"
    },
    "noteShapeTriangleRoundLeftBlack": {
        "codepoint": "U+E1CB",
        "description": "Triangle-round left black (Funk 7-shape ti)"
    },
    "noteShapeTriangleRoundLeftDoubleWhole": {
        "codepoint": "U+ECDD",
        "description": "Triangle-round left double whole (Funk 7-shape ti)"
    },
    "noteShapeTriangleRoundLeftWhite": {
        "codepoint": "U+E1CA",
        "description": "Triangle-round left white (Funk 7-shape ti)"
    },
    "noteShapeTriangleRoundWhite": {
        "codepoint": "U+E1BE",
        "description": "Triangle-round white (Aikin 7-shape ti)"
    },
    "noteShapeTriangleUpBlack": {
        "codepoint": "U+E1BB",
        "description": "Triangle up black (Aikin 7-shape do)"
    },
    "noteShapeTriangleUpDoubleWhole": {
        "codepoint": "U+ECD5",
        "description": "Triangle up double whole (Aikin 7-shape do)"
    },
    "noteShapeTriangleUpWhite": {
        "codepoint": "U+E1BA",
        "description": "Triangle up white (Aikin 7-shape do)"
    },
    "noteSiBlack": {
        "codepoint": "U+E167",
        "description": "Si (black note)"
    },
    "noteSiHalf": {
        "codepoint": "U+E15F",
        "description": "Si (half note)"
    },
    "noteSiWhole": {
        "codepoint": "U+E157",
        "description": "Si (whole note)"
    },
    "noteSoBlack": {
        "codepoint": "U+E164",
        "description": "So (black note)"
    },
    "noteSoHalf": {
        "codepoint": "U+E15C",
        "description": "So (half note)"
    },
    "noteSoWhole": {
        "codepoint": "U+E154",
        "description": "So (whole note)"
    },
    "noteTiBlack": {
        "codepoint": "U+E166",
        "description": "Ti (black note)"
    },
    "noteTiHalf": {
        "codepoint": "U+E15E",
        "description": "Ti (half note)"
    },
    "noteTiWhole": {
        "codepoint": "U+E156",
        "description": "Ti (whole note)"
    },
    "noteWhole": {
        "alternateCodepoint": "U+1D15D",
        "codepoint": "U+E1D2",
        "description": "Whole note (semibreve)"
    },
    "noteheadBlack": {
        "alternateCodepoint": "U+1D158",
        "codepoint": "U+E0A4",
        "description": "Black notehead"
    },
    "noteheadCircleSlash": {
        "codepoint": "U+E0F7",
        "description": "Circle slash notehead"
    },
    "noteheadCircleX": {
        "alternateCodepoint": "U+1D145",
        "codepoint": "U+E0B3",
        "description": "Circle X notehead"
    },
    "noteheadCircleXDoubleWhole": {
        "codepoint": "U+E0B0",
        "description": "Circle X double whole"
    },
    "noteheadCircleXHalf": {
        "codepoint": "U+E0B2",
        "description": "Circle X half"
    },
    "noteheadCircleXWhole": {
        "codepoint": "U+E0B1",
        "description": "Circle X whole"
    },
    "noteheadCircledBlack": {
        "codepoint": "U+E0E4",
        "description": "Circled black notehead"
    },
    "noteheadCircledBlackLarge": {
        "codepoint": "U+E0E8",
        "description": "Black notehead in large circle"
    },
    "noteheadCircledDoubleWhole": {
        "codepoint": "U+E0E7",
        "description": "Circled double whole notehead"
    },
    "noteheadCircledDoubleWholeLarge": {
        "codepoint": "U+E0EB",
        "description": "Double whole notehead in large circle"
    },
    "noteheadCircledHalf": {
        "codepoint": "U+E0E5",
        "description": "Circled half notehead"
    },
    "noteheadCircledHalfLarge": {
        "codepoint": "U+E0E9",
        "description": "Half notehead in large circle"
    },
    "noteheadCircledWhole": {
        "codepoint": "U+E0E6",
        "description": "Circled whole notehead"
    },
    "noteheadCircledWholeLarge": {
        "codepoint": "U+E0EA",
        "description": "Whole notehead in large circle"
    },
    "noteheadCircledXLarge": {
        "codepoint": "U+E0EC",
        "description": "Cross notehead in large circle"
    },
    "noteheadClusterDoubleWhole2nd": {
        "codepoint": "U+E124",
        "description": "Double whole note cluster, 2nd"
    },
    "noteheadClusterDoubleWhole3rd": {
        "codepoint": "U+E128",
        "description": "Double whole note cluster, 3rd"
    },
    "noteheadClusterDoubleWholeBottom": {
        "codepoint": "U+E12E",
        "description": "Combining double whole note cluster, bottom"
    },
    "noteheadClusterDoubleWholeMiddle": {
        "codepoint": "U+E12D",
        "description": "Combining double whole note cluster, middle"
    },
    "noteheadClusterDoubleWholeTop": {
        "codepoint": "U+E12C",
        "description": "Combining double whole note cluster, top"
    },
    "noteheadClusterHalf2nd": {
        "codepoint": "U+E126",
        "description": "Half note cluster, 2nd"
    },
    "noteheadClusterHalf3rd": {
        "codepoint": "U+E12A",
        "description": "Half note cluster, 3rd"
    },
    "noteheadClusterHalfBottom": {
        "codepoint": "U+E134",
        "description": "Combining half note cluster, bottom"
    },
    "noteheadClusterHalfMiddle": {
        "codepoint": "U+E133",
        "description": "Combining half note cluster, middle"
    },
    "noteheadClusterHalfTop": {
        "codepoint": "U+E132",
        "description": "Combining half note cluster, top"
    },
    "noteheadClusterQuarter2nd": {
        "codepoint": "U+E127",
        "description": "Quarter note cluster, 2nd"
    },
    "noteheadClusterQuarter3rd": {
        "codepoint": "U+E12B",
        "description": "Quarter note cluster, 3rd"
    },
    "noteheadClusterQuarterBottom": {
        "codepoint": "U+E137",
        "description": "Combining quarter note cluster, bottom"
    },
    "noteheadClusterQuarterMiddle": {
        "codepoint": "U+E136",
        "description": "Combining quarter note cluster, middle"
    },
    "noteheadClusterQuarterTop": {
        "codepoint": "U+E135",
        "description": "Combining quarter note cluster, top"
    },
    "noteheadClusterRoundBlack": {
        "codepoint": "U+E123",
        "description": "Cluster notehead black (round)"
    },
    "noteheadClusterRoundWhite": {
        "codepoint": "U+E122",
        "description": "Cluster notehead white (round)"
    },
    "noteheadClusterSquareBlack": {
        "alternateCodepoint": "U+1D15B",
        "codepoint": "U+E121",
        "description": "Cluster notehead black (square)"
    },
    "noteheadClusterSquareWhite": {
        "alternateCodepoint": "U+1D15A",
        "codepoint": "U+E120",
        "description": "Cluster notehead white (square)"
    },
    "noteheadClusterWhole2nd": {
        "codepoint": "U+E125",
        "description": "Whole note cluster, 2nd"
    },
    "noteheadClusterWhole3rd": {
        "codepoint": "U+E129",
        "description": "Whole note cluster, 3rd"
    },
    "noteheadClusterWholeBottom": {
        "codepoint": "U+E131",
        "description": "Combining whole note cluster, bottom"
    },
    "noteheadClusterWholeMiddle": {
        "codepoint": "U+E130",
        "description": "Combining whole note cluster, middle"
    },
    "noteheadClusterWholeTop": {
        "codepoint": "U+E12F",
        "description": "Combining whole note cluster, top"
    },
    "noteheadDiamondBlack": {
        "codepoint": "U+E0DB",
        "description": "Diamond black notehead"
    },
    "noteheadDiamondBlackOld": {
        "codepoint": "U+E0E2",
        "description": "Diamond black notehead (old)"
    },
    "noteheadDiamondBlackWide": {
        "codepoint": "U+E0DC",
        "description": "Diamond black notehead (wide)"
    },
    "noteheadDiamondClusterBlack2nd": {
        "codepoint": "U+E139",
        "description": "Black diamond cluster, 2nd"
    },
    "noteheadDiamondClusterBlack3rd": {
        "codepoint": "U+E13B",
        "description": "Black diamond cluster, 3rd"
    },
    "noteheadDiamondClusterBlackBottom": {
        "codepoint": "U+E141",
        "description": "Combining black diamond cluster, bottom"
    },
    "noteheadDiamondClusterBlackMiddle": {
        "codepoint": "U+E140",
        "description": "Combining black diamond cluster, middle"
    },
    "noteheadDiamondClusterBlackTop": {
        "codepoint": "U+E13F",
        "description": "Combining black diamond cluster, top"
    },
    "noteheadDiamondClusterWhite2nd": {
        "codepoint": "U+E138",
        "description": "White diamond cluster, 2nd"
    },
    "noteheadDiamondClusterWhite3rd": {
        "codepoint": "U+E13A",
        "description": "White diamond cluster, 3rd"
    },
    "noteheadDiamondClusterWhiteBottom": {
        "codepoint": "U+E13E",
        "description": "Combining white diamond cluster, bottom"
    },
    "noteheadDiamondClusterWhiteMiddle": {
        "codepoint": "U+E13D",
        "description": "Combining white diamond cluster, middle"
    },
    "noteheadDiamondClusterWhiteTop": {
        "codepoint": "U+E13C",
        "description": "Combining white diamond cluster, top"
    },
    "noteheadDiamondDoubleWhole": {
        "codepoint": "U+E0D7",
        "description": "Diamond double whole notehead"
    },
    "noteheadDiamondDoubleWholeOld": {
        "codepoint": "U+E0DF",
        "description": "Diamond double whole notehead (old)"
    },
    "noteheadDiamondHalf": {
        "codepoint": "U+E0D9",
        "description": "Diamond half notehead"
    },
    "noteheadDiamondHalfFilled": {
        "codepoint": "U+E0E3",
        "description": "Half-filled diamond notehead"
    },
    "noteheadDiamondHalfOld": {
        "codepoint": "U+E0E1",
        "description": "Diamond half notehead (old)"
    },
    "noteheadDiamondHalfWide": {
        "codepoint": "U+E0DA",
        "description": "Diamond half notehead (wide)"
    },
    "noteheadDiamondOpen": {
        "codepoint": "U+E0FC",
        "description": "Open diamond notehead"
    },
    "noteheadDiamondWhite": {
        "codepoint": "U+E0DD",
        "description": "Diamond white notehead"
    },
    "noteheadDiamondWhiteWide": {
        "codepoint": "U+E0DE",
        "description": "Diamond white notehead (wide)"
    },
    "noteheadDiamondWhole": {
        "codepoint": "U+E0D8",
        "description": "Diamond whole notehead"
    },
    "noteheadDiamondWholeOld": {
        "codepoint": "U+E0E0",
        "description": "Diamond whole notehead (old)"
    },
    "noteheadDoubleWhole": {
        "codepoint": "U+E0A0",
        "description": "Double whole (breve) notehead"
    },
    "noteheadDoubleWholeSquare": {
        "codepoint": "U+E0A1",
        "description": "Double whole (breve) notehead (square)"
    },
    "noteheadDoubleWholeWithX": {
        "codepoint": "U+E0B4",
        "description": "Double whole notehead with X"
    },
    "noteheadHalf": {
        "alternateCodepoint": "U+1D157",
        "codepoint": "U+E0A3",
        "description": "Half (minim) notehead"
    },
    "noteheadHalfFilled": {
        "codepoint": "U+E0FB",
        "description": "Filled half (minim) notehead"
    },
    "noteheadHalfWithX": {
        "codepoint": "U+E0B6",
        "description": "Half notehead with X"
    },
    "noteheadHeavyX": {
        "codepoint": "U+E0F8",
        "description": "Heavy X notehead"
    },
    "noteheadHeavyXHat": {
        "codepoint": "U+E0F9",
        "description": "Heavy X with hat notehead"
    },
    "noteheadLargeArrowDownBlack": {
        "codepoint": "U+E0F4",
        "description": "Large arrow down (lowest pitch) black notehead"
    },
    "noteheadLargeArrowDownDoubleWhole": {
        "codepoint": "U+E0F1",
        "description": "Large arrow down (lowest pitch) double whole notehead"
    },
    "noteheadLargeArrowDownHalf": {
        "codepoint": "U+E0F3",
        "description": "Large arrow down (lowest pitch) half notehead"
    },
    "noteheadLargeArrowDownWhole": {
        "codepoint": "U+E0F2",
        "description": "Large arrow down (lowest pitch) whole notehead"
    },
    "noteheadLargeArrowUpBlack": {
        "codepoint": "U+E0F0",
        "description": "Large arrow up (highest pitch) black notehead"
    },
    "noteheadLargeArrowUpDoubleWhole": {
        "codepoint": "U+E0ED",
        "description": "Large arrow up (highest pitch) double whole notehead"
    },
    "noteheadLargeArrowUpHalf": {
        "codepoint": "U+E0EF",
        "description": "Large arrow up (highest pitch) half notehead"
    },
    "noteheadLargeArrowUpWhole": {
        "codepoint": "U+E0EE",
        "description": "Large arrow up (highest pitch) whole notehead"
    },
    "noteheadMoonBlack": {
        "alternateCodepoint": "U+1D153",
        "codepoint": "U+E0CB",
        "description": "Moon notehead black"
    },
    "noteheadMoonWhite": {
        "alternateCodepoint": "U+1D152",
        "codepoint": "U+E0CA",
        "description": "Moon notehead white"
    },
    "noteheadNull": {
        "alternateCodepoint": "U+1D159",
        "codepoint": "U+E0A5",
        "description": "Null notehead"
    },
    "noteheadParenthesis": {
        "alternateCodepoint": "U+1D156",
        "codepoint": "U+E0CE",
        "description": "Parenthesis notehead"
    },
    "noteheadParenthesisLeft": {
        "codepoint": "U+E0F5",
        "description": "Opening parenthesis"
    },
    "noteheadParenthesisRight": {
        "codepoint": "U+E0F6",
        "description": "Closing parenthesis"
    },
    "noteheadPlusBlack": {
        "alternateCodepoint": "U+1D144",
        "codepoint": "U+E0AF",
        "description": "Plus notehead black"
    },
    "noteheadPlusDoubleWhole": {
        "codepoint": "U+E0AC",
        "description": "Plus notehead double whole"
    },
    "noteheadPlusHalf": {
        "codepoint": "U+E0AE",
        "description": "Plus notehead half"
    },
    "noteheadPlusWhole": {
        "codepoint": "U+E0AD",
        "description": "Plus notehead whole"
    },
    "noteheadRectangularClusterBlackBottom": {
        "codepoint": "U+E144",
        "description": "Combining black rectangular cluster, bottom"
    },
    "noteheadRectangularClusterBlackMiddle": {
        "codepoint": "U+E143",
        "description": "Combining black rectangular cluster, middle"
    },
    "noteheadRectangularClusterBlackTop": {
        "codepoint": "U+E142",
        "description": "Combining black rectangular cluster, top"
    },
    "noteheadRectangularClusterWhiteBottom": {
        "codepoint": "U+E147",
        "description": "Combining white rectangular cluster, bottom"
    },
    "noteheadRectangularClusterWhiteMiddle": {
        "codepoint": "U+E146",
        "description": "Combining white rectangular cluster, middle"
    },
    "noteheadRectangularClusterWhiteTop": {
        "codepoint": "U+E145",
        "description": "Combining white rectangular cluster, top"
    },
    "noteheadRoundBlack": {
        "codepoint": "U+E113",
        "description": "Round black notehead"
    },
    "noteheadRoundBlackDoubleSlashed": {
        "codepoint": "U+E11C",
        "description": "Round black notehead, double slashed"
    },
    "noteheadRoundBlackLarge": {
        "codepoint": "U+E110",
        "description": "Large round black notehead"
    },
    "noteheadRoundBlackSlashed": {
        "codepoint": "U+E118",
        "description": "Round black notehead, slashed"
    },
    "noteheadRoundBlackSlashedLarge": {
        "codepoint": "U+E116",
        "description": "Large round black notehead, slashed"
    },
    "noteheadRoundWhite": {
        "codepoint": "U+E114",
        "description": "Round white notehead"
    },
    "noteheadRoundWhiteDoubleSlashed": {
        "codepoint": "U+E11D",
        "description": "Round white notehead, double slashed"
    },
    "noteheadRoundWhiteLarge": {
        "codepoint": "U+E111",
        "description": "Large round white notehead"
    },
    "noteheadRoundWhiteSlashed": {
        "codepoint": "U+E119",
        "description": "Round white notehead, slashed"
    },
    "noteheadRoundWhiteSlashedLarge": {
        "codepoint": "U+E117",
        "description": "Large round white notehead, slashed"
    },
    "noteheadRoundWhiteWithDot": {
        "codepoint": "U+E115",
        "description": "Round white notehead with dot"
    },
    "noteheadRoundWhiteWithDotLarge": {
        "codepoint": "U+E112",
        "description": "Large round white notehead with dot"
    },
    "noteheadSlashDiamondWhite": {
        "codepoint": "U+E104",
        "description": "Large white diamond"
    },
    "noteheadSlashHorizontalEnds": {
        "alternateCodepoint": "U+1D10D",
        "codepoint": "U+E101",
        "description": "Slash with horizontal ends"
    },
    "noteheadSlashHorizontalEndsMuted": {
        "codepoint": "U+E108",
        "description": "Muted slash with horizontal ends"
    },
    "noteheadSlashVerticalEnds": {
        "codepoint": "U+E100",
        "description": "Slash with vertical ends"
    },
    "noteheadSlashVerticalEndsMuted": {
        "codepoint": "U+E107",
        "description": "Muted slash with vertical ends"
    },
    "noteheadSlashVerticalEndsSmall": {
        "codepoint": "U+E105",
        "description": "Small slash with vertical ends"
    },
    "noteheadSlashWhiteDoubleWhole": {
        "codepoint": "U+E10A",
        "description": "White slash double whole"
    },
    "noteheadSlashWhiteHalf": {
        "codepoint": "U+E103",
        "description": "White slash half"
    },
    "noteheadSlashWhiteMuted": {
        "codepoint": "U+E109",
        "description": "Muted white slash"
    },
    "noteheadSlashWhiteWhole": {
        "codepoint": "U+E102",
        "description": "White slash whole"
    },
    "noteheadSlashX": {
        "codepoint": "U+E106",
        "description": "Large X notehead"
    },
    "noteheadSlashedBlack1": {
        "codepoint": "U+E0CF",
        "description": "Slashed black notehead (bottom left to top right)"
    },
    "noteheadSlashedBlack2": {
        "codepoint": "U+E0D0",
        "description": "Slashed black notehead (top left to bottom right)"
    },
    "noteheadSlashedDoubleWhole1": {
        "codepoint": "U+E0D5",
        "description": "Slashed double whole notehead (bottom left to top right)"
    },
    "noteheadSlashedDoubleWhole2": {
        "codepoint": "U+E0D6",
        "description": "Slashed double whole notehead (top left to bottom right)"
    },
    "noteheadSlashedHalf1": {
        "codepoint": "U+E0D1",
        "description": "Slashed half notehead (bottom left to top right)"
    },
    "noteheadSlashedHalf2": {
        "codepoint": "U+E0D2",
        "description": "Slashed half notehead (top left to bottom right)"
    },
    "noteheadSlashedWhole1": {
        "codepoint": "U+E0D3",
        "description": "Slashed whole notehead (bottom left to top right)"
    },
    "noteheadSlashedWhole2": {
        "codepoint": "U+E0D4",
        "description": "Slashed whole notehead (top left to bottom right)"
    },
    "noteheadSquareBlack": {
        "alternateCodepoint": "U+1D147",
        "codepoint": "U+E0B9",
        "description": "Square notehead black"
    },
    "noteheadSquareBlackLarge": {
        "codepoint": "U+E11A",
        "description": "Large square black notehead"
    },
    "noteheadSquareBlackWhite": {
        "codepoint": "U+E11B",
        "description": "Large square white notehead"
    },
    "noteheadSquareWhite": {
        "alternateCodepoint": "U+1D146",
        "codepoint": "U+E0B8",
        "description": "Square notehead white"
    },
    "noteheadTriangleDownBlack": {
        "alternateCodepoint": "U+1D14F",
        "codepoint": "U+E0C7",
        "description": "Triangle notehead down black"
    },
    "noteheadTriangleDownDoubleWhole": {
        "codepoint": "U+E0C3",
        "description": "Triangle notehead down double whole"
    },
    "noteheadTriangleDownHalf": {
        "codepoint": "U+E0C5",
        "description": "Triangle notehead down half"
    },
    "noteheadTriangleDownWhite": {
        "alternateCodepoint": "U+1D14E",
        "codepoint": "U+E0C6",
        "description": "Triangle notehead down white"
    },
    "noteheadTriangleDownWhole": {
        "codepoint": "U+E0C4",
        "description": "Triangle notehead down whole"
    },
    "noteheadTriangleLeftBlack": {
        "alternateCodepoint": "U+1D14B",
        "codepoint": "U+E0C0",
        "description": "Triangle notehead left black"
    },
    "noteheadTriangleLeftWhite": {
        "alternateCodepoint": "U+1D14A",
        "codepoint": "U+E0BF",
        "description": "Triangle notehead left white"
    },
    "noteheadTriangleRightBlack": {
        "alternateCodepoint": "U+1D14D",
        "codepoint": "U+E0C2",
        "description": "Triangle notehead right black"
    },
    "noteheadTriangleRightWhite": {
        "alternateCodepoint": "U+1D14C",
        "codepoint": "U+E0C1",
        "description": "Triangle notehead right white"
    },
    "noteheadTriangleRoundDownBlack": {
        "alternateCodepoint": "U+1D155",
        "codepoint": "U+E0CD",
        "description": "Triangle-round notehead down black"
    },
    "noteheadTriangleRoundDownWhite": {
        "alternateCodepoint": "U+1D154",
        "codepoint": "U+E0CC",
        "description": "Triangle-round notehead down white"
    },
    "noteheadTriangleUpBlack": {
        "alternateCodepoint": "U+1D149",
        "codepoint": "U+E0BE",
        "description": "Triangle notehead up black"
    },
    "noteheadTriangleUpDoubleWhole": {
        "codepoint": "U+E0BA",
        "description": "Triangle notehead up double whole"
    },
    "noteheadTriangleUpHalf": {
        "codepoint": "U+E0BC",
        "description": "Triangle notehead up half"
    },
    "noteheadTriangleUpRightBlack": {
        "alternateCodepoint": "U+1D151",
        "codepoint": "U+E0C9",
        "description": "Triangle notehead up right black"
    },
    "noteheadTriangleUpRightWhite": {
        "alternateCodepoint": "U+1D150",
        "codepoint": "U+E0C8",
        "description": "Triangle notehead up right white"
    },
    "noteheadTriangleUpWhite": {
        "alternateCodepoint": "U+1D148",
        "codepoint": "U+E0BD",
        "description": "Triangle notehead up white"
    },
    "noteheadTriangleUpWhole": {
        "codepoint": "U+E0BB",
        "description": "Triangle notehead up whole"
    },
    "noteheadVoidWithX": {
        "codepoint": "U+E0B7",
        "description": "Void notehead with X"
    },
    "noteheadWhole": {
        "codepoint": "U+E0A2",
        "description": "Whole (semibreve) notehead"
    },
    "noteheadWholeFilled": {
        "codepoint": "U+E0FA",
        "description": "Filled whole (semibreve) notehead"
    },
    "noteheadWholeWithX": {
        "codepoint": "U+E0B5",
        "description": "Whole notehead with X"
    },
    "noteheadXBlack": {
        "alternateCodepoint": "U+1D143",
        "codepoint": "U+E0A9",
        "description": "X notehead black"
    },
    "noteheadXDoubleWhole": {
        "codepoint": "U+E0A6",
        "description": "X notehead double whole"
    },
    "noteheadXHalf": {
        "codepoint": "U+E0A8",
        "description": "X notehead half"
    },
    "noteheadXOrnate": {
        "codepoint": "U+E0AA",
        "description": "Ornate X notehead"
    },
    "noteheadXOrnateEllipse": {
        "codepoint": "U+E0AB",
        "description": "Ornate X notehead in ellipse"
    },
    "noteheadXWhole": {
        "codepoint": "U+E0A7",
        "description": "X notehead whole"
    },
    "octaveBaselineA": {
        "codepoint": "U+EC91",
        "description": "a (baseline)"
    },
    "octaveBaselineB": {
        "codepoint": "U+EC93",
        "description": "b (baseline)"
    },
    "octaveBaselineM": {
        "codepoint": "U+EC95",
        "description": "m (baseline)"
    },
    "octaveBaselineV": {
        "codepoint": "U+EC97",
        "description": "v (baseline)"
    },
    "octaveBassa": {
        "codepoint": "U+E51F",
        "description": "Bassa"
    },
    "octaveLoco": {
        "codepoint": "U+EC90",
        "description": "Loco"
    },
    "octaveParensLeft": {
        "codepoint": "U+E51A",
        "description": "Left parenthesis for octave signs"
    },
    "octaveParensRight": {
        "codepoint": "U+E51B",
        "description": "Right parenthesis for octave signs"
    },
    "octaveSuperscriptA": {
        "codepoint": "U+EC92",
        "description": "a (superscript)"
    },
    "octaveSuperscriptB": {
        "codepoint": "U+EC94",
        "description": "b (superscript)"
    },
    "octaveSuperscriptM": {
        "codepoint": "U+EC96",
        "description": "m (superscript)"
    },
    "octaveSuperscriptV": {
        "codepoint": "U+EC98",
        "description": "v (superscript)"
    },
    "oneHandedRollStevens": {
        "codepoint": "U+E233",
        "description": "One-handed roll (Stevens)"
    },
    "organGerman2Fusae": {
        "codepoint": "U+EE2E",
        "description": "Two Fusae"
    },
    "organGerman2Minimae": {
        "codepoint": "U+EE2C",
        "description": "Two Minimae"
    },
    "organGerman2OctaveUp": {
        "codepoint": "U+EE19",
        "description": "Combining double octave line above"
    },
    "organGerman2Semifusae": {
        "codepoint": "U+EE2F",
        "description": "Two Semifusae"
    },
    "organGerman2Semiminimae": {
        "codepoint": "U+EE2D",
        "description": "Two Semiminimae"
    },
    "organGerman3Fusae": {
        "codepoint": "U+EE32",
        "description": "Three Fusae"
    },
    "organGerman3Minimae": {
        "codepoint": "U+EE30",
        "description": "Three Minimae"
    },
    "organGerman3Semifusae": {
        "codepoint": "U+EE33",
        "description": "Three Semifusae"
    },
    "organGerman3Semiminimae": {
        "codepoint": "U+EE31",
        "description": "Three Semiminimae"
    },
    "organGerman4Fusae": {
        "codepoint": "U+EE36",
        "description": "Four Fusae"
    },
    "organGerman4Minimae": {
        "codepoint": "U+EE34",
        "description": "Four Minimae"
    },
    "organGerman4Semifusae": {
        "codepoint": "U+EE37",
        "description": "Four Semifusae"
    },
    "organGerman4Semiminimae": {
        "codepoint": "U+EE35",
        "description": "Four Semiminimae"
    },
    "organGerman5Fusae": {
        "codepoint": "U+EE3A",
        "description": "Five Fusae"
    },
    "organGerman5Minimae": {
        "codepoint": "U+EE38",
        "description": "Five Minimae"
    },
    "organGerman5Semifusae": {
        "codepoint": "U+EE3B",
        "description": "Five Semifusae"
    },
    "organGerman5Semiminimae": {
        "codepoint": "U+EE39",
        "description": "Five Semiminimae"
    },
    "organGerman6Fusae": {
        "codepoint": "U+EE3E",
        "description": "Six Fusae"
    },
    "organGerman6Minimae": {
        "codepoint": "U+EE3C",
        "description": "Six Minimae"
    },
    "organGerman6Semifusae": {
        "codepoint": "U+EE3F",
        "description": "Six Semifusae"
    },
    "organGerman6Semiminimae": {
        "codepoint": "U+EE3D",
        "description": "Six Semiminimae"
    },
    "organGermanALower": {
        "codepoint": "U+EE15",
        "description": "German organ tablature small A"
    },
    "organGermanAUpper": {
        "codepoint": "U+EE09",
        "description": "German organ tablature great A"
    },
    "organGermanAugmentationDot": {
        "codepoint": "U+EE1C",
        "description": "Rhythm Dot"
    },
    "organGermanBLower": {
        "codepoint": "U+EE16",
        "description": "German organ tablature small B"
    },
    "organGermanBUpper": {
        "codepoint": "U+EE0A",
        "description": "German organ tablature great B"
    },
    "organGermanBuxheimerBrevis2": {
        "codepoint": "U+EE25",
        "description": "Brevis (Binary) Buxheimer Orgelbuch"
    },
    "organGermanBuxheimerBrevis3": {
        "codepoint": "U+EE24",
        "description": "Brevis (Ternary) Buxheimer Orgelbuch"
    },
    "organGermanBuxheimerMinimaRest": {
        "codepoint": "U+EE1E",
        "description": "Minima Rest Buxheimer Orgelbuch"
    },
    "organGermanBuxheimerSemibrevis": {
        "codepoint": "U+EE26",
        "description": "Semibrevis Buxheimer Orgelbuch"
    },
    "organGermanBuxheimerSemibrevisRest": {
        "codepoint": "U+EE1D",
        "description": "Semibrevis Rest Buxheimer Orgelbuch"
    },
    "organGermanCLower": {
        "codepoint": "U+EE0C",
        "description": "German organ tablature small C"
    },
    "organGermanCUpper": {
        "codepoint": "U+EE00",
        "description": "German organ tablature great C"
    },
    "organGermanCisLower": {
        "codepoint": "U+EE0D",
        "description": "German organ tablature small Cis"
    },
    "organGermanCisUpper": {
        "codepoint": "U+EE01",
        "description": "German organ tablature great Cis"
    },
    "organGermanDLower": {
        "codepoint": "U+EE0E",
        "description": "German organ tablature small D"
    },
    "organGermanDUpper": {
        "codepoint": "U+EE02",
        "description": "German organ tablature great D"
    },
    "organGermanDisLower": {
        "codepoint": "U+EE0F",
        "description": "German organ tablature small Dis"
    },
    "organGermanDisUpper": {
        "codepoint": "U+EE03",
        "description": "German organ tablature great Dis"
    },
    "organGermanELower": {
        "codepoint": "U+EE10",
        "description": "German organ tablature small E"
    },
    "organGermanEUpper": {
        "codepoint": "U+EE04",
        "description": "German organ tablature great E"
    },
    "organGermanFLower": {
        "codepoint": "U+EE11",
        "description": "German organ tablature small F"
    },
    "organGermanFUpper": {
        "codepoint": "U+EE05",
        "description": "German organ tablature great F"
    },
    "organGermanFisLower": {
        "codepoint": "U+EE12",
        "description": "German organ tablature small Fis"
    },
    "organGermanFisUpper": {
        "codepoint": "U+EE06",
        "description": "German organ tablature great Fis"
    },
    "organGermanFusa": {
        "codepoint": "U+EE2A",
        "description": "Fusa"
    },
    "organGermanFusaRest": {
        "codepoint": "U+EE22",
        "description": "Fusa Rest"
    },
    "organGermanGLower": {
        "codepoint": "U+EE13",
        "description": "German organ tablature small G"
    },
    "organGermanGUpper": {
        "codepoint": "U+EE07",
        "description": "German organ tablature great G"
    },
    "organGermanGisLower": {
        "codepoint": "U+EE14",
        "description": "German organ tablature small Gis"
    },
    "organGermanGisUpper": {
        "codepoint": "U+EE08",
        "description": "German organ tablature great Gis"
    },
    "organGermanHLower": {
        "codepoint": "U+EE17",
        "description": "German organ tablature small H"
    },
    "organGermanHUpper": {
        "codepoint": "U+EE0B",
        "description": "German organ tablature great H"
    },
    "organGermanMinima": {
        "codepoint": "U+EE28",
        "description": "Minima"
    },
    "organGermanMinimaRest": {
        "codepoint": "U+EE20",
        "description": "Minima Rest"
    },
    "organGermanOctaveDown": {
        "codepoint": "U+EE1A",
        "description": "Combining single octave line below"
    },
    "organGermanOctaveUp": {
        "codepoint": "U+EE18",
        "description": "Combining single octave line above"
    },
    "organGermanSemibrevis": {
        "codepoint": "U+EE27",
        "description": "Semibrevis"
    },
    "organGermanSemibrevisRest": {
        "codepoint": "U+EE1F",
        "description": "Semibrevis Rest"
    },
    "organGermanSemifusa": {
        "codepoint": "U+EE2B",
        "description": "Semifusa"
    },
    "organGermanSemifusaRest": {
        "codepoint": "U+EE23",
        "description": "Semifusa Rest"
    },
    "organGermanSemiminima": {
        "codepoint": "U+EE29",
        "description": "Semiminima"
    },
    "organGermanSemiminimaRest": {
        "codepoint": "U+EE21",
        "description": "Semiminima Rest"
    },
    "organGermanTie": {
        "codepoint": "U+EE1B",
        "description": "Tie"
    },
    "ornamentBottomLeftConcaveStroke": {
        "codepoint": "U+E59A",
        "description": "Ornament bottom left concave stroke"
    },
    "ornamentBottomLeftConcaveStrokeLarge": {
        "alternateCodepoint": "U+1D1A1",
        "codepoint": "U+E59B",
        "description": "Ornament bottom left concave stroke, large"
    },
    "ornamentBottomLeftConvexStroke": {
        "codepoint": "U+E59C",
        "description": "Ornament bottom left convex stroke"
    },
    "ornamentBottomRightConcaveStroke": {
        "alternateCodepoint": "U+1D19F",
        "codepoint": "U+E5A7",
        "description": "Ornament bottom right concave stroke"
    },
    "ornamentBottomRightConvexStroke": {
        "codepoint": "U+E5A8",
        "description": "Ornament bottom right convex stroke"
    },
    "ornamentComma": {
        "codepoint": "U+E581",
        "description": "Comma"
    },
    "ornamentDoubleObliqueLinesAfterNote": {
        "codepoint": "U+E57E",
        "description": "Double oblique straight lines NW-SE"
    },
    "ornamentDoubleObliqueLinesBeforeNote": {
        "codepoint": "U+E57D",
        "description": "Double oblique straight lines SW-NE"
    },
    "ornamentDownCurve": {
        "codepoint": "U+E578",
        "description": "Curve below"
    },
    "ornamentHaydn": {
        "codepoint": "U+E56F",
        "description": "Haydn ornament"
    },
    "ornamentHighLeftConcaveStroke": {
        "codepoint": "U+E592",
        "description": "Ornament high left concave stroke"
    },
    "ornamentHighLeftConvexStroke": {
        "alternateCodepoint": "U+1D1A2",
        "codepoint": "U+E593",
        "description": "Ornament high left convex stroke"
    },
    "ornamentHighRightConcaveStroke": {
        "codepoint": "U+E5A2",
        "description": "Ornament high right concave stroke"
    },
    "ornamentHighRightConvexStroke": {
        "codepoint": "U+E5A3",
        "description": "Ornament high right convex stroke"
    },
    "ornamentHookAfterNote": {
        "codepoint": "U+E576",
        "description": "Hook after note"
    },
    "ornamentHookBeforeNote": {
        "codepoint": "U+E575",
        "description": "Hook before note"
    },
    "ornamentLeftFacingHalfCircle": {
        "codepoint": "U+E572",
        "description": "Left-facing half circle"
    },
    "ornamentLeftFacingHook": {
        "codepoint": "U+E574",
        "description": "Left-facing hook"
    },
    "ornamentLeftPlus": {
        "codepoint": "U+E597",
        "description": "Ornament left +"
    },
    "ornamentLeftShakeT": {
        "codepoint": "U+E596",
        "description": "Ornament left shake t"
    },
    "ornamentLeftVerticalStroke": {
        "alternateCodepoint": "U+1D19B",
        "codepoint": "U+E594",
        "description": "Ornament left vertical stroke"
    },
    "ornamentLeftVerticalStrokeWithCross": {
        "codepoint": "U+E595",
        "description": "Ornament left vertical stroke with cross (+)"
    },
    "ornamentLowLeftConcaveStroke": {
        "codepoint": "U+E598",
        "description": "Ornament low left concave stroke"
    },
    "ornamentLowLeftConvexStroke": {
        "alternateCodepoint": "U+1D1A4",
        "codepoint": "U+E599",
        "description": "Ornament low left convex stroke"
    },
    "ornamentLowRightConcaveStroke": {
        "alternateCodepoint": "U+1D1A3",
        "codepoint": "U+E5A5",
        "description": "Ornament low right concave stroke"
    },
    "ornamentLowRightConvexStroke": {
        "codepoint": "U+E5A6",
        "description": "Ornament low right convex stroke"
    },
    "ornamentMiddleVerticalStroke": {
        "alternateCodepoint": "U+1D1A0",
        "codepoint": "U+E59F",
        "description": "Ornament middle vertical stroke"
    },
    "ornamentMordent": {
        "codepoint": "U+E56D",
        "description": "Mordent"
    },
    "ornamentObliqueLineAfterNote": {
        "codepoint": "U+E57C",
        "description": "Oblique straight line NW-SE"
    },
    "ornamentObliqueLineBeforeNote": {
        "codepoint": "U+E57B",
        "description": "Oblique straight line SW-NE"
    },
    "ornamentObliqueLineHorizAfterNote": {
        "codepoint": "U+E580",
        "description": "Oblique straight line tilted NW-SE"
    },
    "ornamentObliqueLineHorizBeforeNote": {
        "codepoint": "U+E57F",
        "description": "Oblique straight line tilted SW-NE"
    },
    "ornamentOriscus": {
        "codepoint": "U+EA21",
        "description": "Oriscus"
    },
    "ornamentPinceCouperin": {
        "codepoint": "U+E588",
        "description": "Pinc\u00e9 (Couperin)"
    },
    "ornamentPortDeVoixV": {
        "codepoint": "U+E570",
        "description": "Port de voix"
    },
    "ornamentPrecompAppoggTrill": {
        "codepoint": "U+E5B2",
        "description": "Supported appoggiatura trill"
    },
    "ornamentPrecompAppoggTrillSuffix": {
        "codepoint": "U+E5B3",
        "description": "Supported appoggiatura trill with two-note suffix"
    },
    "ornamentPrecompCadence": {
        "codepoint": "U+E5BE",
        "description": "Cadence"
    },
    "ornamentPrecompCadenceUpperPrefix": {
        "codepoint": "U+E5C1",
        "description": "Cadence with upper prefix"
    },
    "ornamentPrecompCadenceUpperPrefixTurn": {
        "codepoint": "U+E5C2",
        "description": "Cadence with upper prefix and turn"
    },
    "ornamentPrecompCadenceWithTurn": {
        "codepoint": "U+E5BF",
        "description": "Cadence with turn"
    },
    "ornamentPrecompDescendingSlide": {
        "codepoint": "U+E5B1",
        "description": "Descending slide"
    },
    "ornamentPrecompDoubleCadenceLowerPrefix": {
        "codepoint": "U+E5C0",
        "description": "Double cadence with lower prefix"
    },
    "ornamentPrecompDoubleCadenceUpperPrefix": {
        "codepoint": "U+E5C3",
        "description": "Double cadence with upper prefix"
    },
    "ornamentPrecompDoubleCadenceUpperPrefixTurn": {
        "codepoint": "U+E5C4",
        "description": "Double cadence with upper prefix and turn"
    },
    "ornamentPrecompInvertedMordentUpperPrefix": {
        "codepoint": "U+E5C7",
        "description": "Inverted mordent with upper prefix"
    },
    "ornamentPrecompMordentRelease": {
        "codepoint": "U+E5C5",
        "description": "Mordent with release"
    },
    "ornamentPrecompMordentUpperPrefix": {
        "codepoint": "U+E5C6",
        "description": "Mordent with upper prefix"
    },
    "ornamentPrecompPortDeVoixMordent": {
        "codepoint": "U+E5BC",
        "description": "Pre-beat port de voix follwed by multiple mordent (Dandrieu)"
    },
    "ornamentPrecompSlide": {
        "codepoint": "U+E5B0",
        "description": "Slide"
    },
    "ornamentPrecompSlideTrillBach": {
        "codepoint": "U+E5B8",
        "description": "Slide-trill with two-note suffix (J.S. Bach)"
    },
    "ornamentPrecompSlideTrillDAnglebert": {
        "codepoint": "U+E5B5",
        "description": "Slide-trill (D'Anglebert)"
    },
    "ornamentPrecompSlideTrillMarpurg": {
        "codepoint": "U+E5B6",
        "description": "Slide-trill with one-note suffix (Marpurg)"
    },
    "ornamentPrecompSlideTrillMuffat": {
        "codepoint": "U+E5B9",
        "description": "Slide-trill (Muffat)"
    },
    "ornamentPrecompSlideTrillSuffixMuffat": {
        "codepoint": "U+E5BA",
        "description": "Slide-trill with two-note suffix (Muffat)"
    },
    "ornamentPrecompTrillLowerSuffix": {
        "codepoint": "U+E5C8",
        "description": "Trill with lower suffix"
    },
    "ornamentPrecompTrillSuffixDandrieu": {
        "codepoint": "U+E5BB",
        "description": "Trill with two-note suffix (Dandrieu)"
    },
    "ornamentPrecompTrillWithMordent": {
        "codepoint": "U+E5BD",
        "description": "Trill with mordent"
    },
    "ornamentPrecompTurnTrillBach": {
        "codepoint": "U+E5B7",
        "description": "Turn-trill with two-note suffix (J.S. Bach)"
    },
    "ornamentPrecompTurnTrillDAnglebert": {
        "codepoint": "U+E5B4",
        "description": "Turn-trill (D'Anglebert)"
    },
    "ornamentQuilisma": {
        "codepoint": "U+EA20",
        "description": "Quilisma"
    },
    "ornamentRightFacingHalfCircle": {
        "codepoint": "U+E571",
        "description": "Right-facing half circle"
    },
    "ornamentRightFacingHook": {
        "codepoint": "U+E573",
        "description": "Right-facing hook"
    },
    "ornamentRightVerticalStroke": {
        "codepoint": "U+E5A4",
        "description": "Ornament right vertical stroke"
    },
    "ornamentSchleifer": {
        "codepoint": "U+E587",
        "description": "Schleifer (long mordent)"
    },
    "ornamentShake3": {
        "codepoint": "U+E582",
        "description": "Shake"
    },
    "ornamentShakeMuffat1": {
        "codepoint": "U+E584",
        "description": "Shake (Muffat)"
    },
    "ornamentShortObliqueLineAfterNote": {
        "codepoint": "U+E57A",
        "description": "Short oblique straight line NW-SE"
    },
    "ornamentShortObliqueLineBeforeNote": {
        "codepoint": "U+E579",
        "description": "Short oblique straight line SW-NE"
    },
    "ornamentShortTrill": {
        "codepoint": "U+E56C",
        "description": "Short trill"
    },
    "ornamentTopLeftConcaveStroke": {
        "codepoint": "U+E590",
        "description": "Ornament top left concave stroke"
    },
    "ornamentTopLeftConvexStroke": {
        "alternateCodepoint": "U+1D1A5",
        "codepoint": "U+E591",
        "description": "Ornament top left convex stroke"
    },
    "ornamentTopRightConcaveStroke": {
        "codepoint": "U+E5A0",
        "description": "Ornament top right concave stroke"
    },
    "ornamentTopRightConvexStroke": {
        "alternateCodepoint": "U+1D19E",
        "codepoint": "U+E5A1",
        "description": "Ornament top right convex stroke"
    },
    "ornamentTremblement": {
        "codepoint": "U+E56E",
        "description": "Tremblement"
    },
    "ornamentTremblementCouperin": {
        "codepoint": "U+E589",
        "description": "Tremblement appuy\u00e9 (Couperin)"
    },
    "ornamentTrill": {
        "alternateCodepoint": "U+1D196",
        "codepoint": "U+E566",
        "description": "Trill"
    },
    "ornamentTurn": {
        "alternateCodepoint": "U+1D197",
        "codepoint": "U+E567",
        "description": "Turn"
    },
    "ornamentTurnInverted": {
        "alternateCodepoint": "U+1D198",
        "codepoint": "U+E568",
        "description": "Inverted turn"
    },
    "ornamentTurnSlash": {
        "alternateCodepoint": "U+1D199",
        "codepoint": "U+E569",
        "description": "Turn with slash"
    },
    "ornamentTurnUp": {
        "alternateCodepoint": "U+1D19A",
        "codepoint": "U+E56A",
        "description": "Turn up"
    },
    "ornamentTurnUpS": {
        "codepoint": "U+E56B",
        "description": "Inverted turn up"
    },
    "ornamentUpCurve": {
        "codepoint": "U+E577",
        "description": "Curve above"
    },
    "ornamentVerticalLine": {
        "codepoint": "U+E583",
        "description": "Vertical line"
    },
    "ornamentZigZagLineNoRightEnd": {
        "alternateCodepoint": "U+1D19C",
        "codepoint": "U+E59D",
        "description": "Ornament zig-zag line without right-hand end"
    },
    "ornamentZigZagLineWithRightEnd": {
        "alternateCodepoint": "U+1D19D",
        "codepoint": "U+E59E",
        "description": "Ornament zig-zag line with right-hand end"
    },
    "ottava": {
        "codepoint": "U+E510",
        "description": "Ottava"
    },
    "ottavaAlta": {
        "alternateCodepoint": "U+1D136",
        "codepoint": "U+E511",
        "description": "Ottava alta"
    },
    "ottavaBassa": {
        "alternateCodepoint": "U+1D137",
        "codepoint": "U+E512",
        "description": "Ottava bassa"
    },
    "ottavaBassaBa": {
        "codepoint": "U+E513",
        "description": "Ottava bassa (ba)"
    },
    "ottavaBassaVb": {
        "codepoint": "U+E51C",
        "description": "Ottava bassa (8vb)"
    },
    "pendereckiTremolo": {
        "codepoint": "U+E22B",
        "description": "Penderecki unmeasured tremolo"
    },
    "pictAgogo": {
        "codepoint": "U+E717",
        "description": "Agogo"
    },
    "pictAlmglocken": {
        "codepoint": "U+E712",
        "description": "Almglocken"
    },
    "pictAnvil": {
        "codepoint": "U+E701",
        "description": "Anvil"
    },
    "pictBambooChimes": {
        "codepoint": "U+E6C3",
        "description": "Bamboo tube chimes"
    },
    "pictBambooScraper": {
        "codepoint": "U+E6FB",
        "description": "Bamboo scraper"
    },
    "pictBassDrum": {
        "codepoint": "U+E6D4",
        "description": "Bass drum"
    },
    "pictBassDrumOnSide": {
        "codepoint": "U+E6D5",
        "description": "Bass drum on side"
    },
    "pictBeaterBow": {
        "codepoint": "U+E7DE",
        "description": "Bow"
    },
    "pictBeaterBox": {
        "codepoint": "U+E7EB",
        "description": "Box for percussion beater"
    },
    "pictBeaterBrassMalletsDown": {
        "codepoint": "U+E7DA",
        "description": "Brass mallets down"
    },
    "pictBeaterBrassMalletsLeft": {
        "codepoint": "U+E7EE",
        "description": "Brass mallets left"
    },
    "pictBeaterBrassMalletsRight": {
        "codepoint": "U+E7ED",
        "description": "Brass mallets right"
    },
    "pictBeaterBrassMalletsUp": {
        "codepoint": "U+E7D9",
        "description": "Brass mallets up"
    },
    "pictBeaterCombiningDashedCircle": {
        "codepoint": "U+E7EA",
        "description": "Combining dashed circle for round beaters (plated)"
    },
    "pictBeaterCombiningParentheses": {
        "codepoint": "U+E7E9",
        "description": "Combining parentheses for round beaters (padded)"
    },
    "pictBeaterDoubleBassDrumDown": {
        "codepoint": "U+E7A1",
        "description": "Double bass drum stick down"
    },
    "pictBeaterDoubleBassDrumUp": {
        "codepoint": "U+E7A0",
        "description": "Double bass drum stick up"
    },
    "pictBeaterFinger": {
        "codepoint": "U+E7E4",
        "description": "Finger"
    },
    "pictBeaterFingernails": {
        "codepoint": "U+E7E6",
        "description": "Fingernails"
    },
    "pictBeaterFist": {
        "codepoint": "U+E7E5",
        "description": "Fist"
    },
    "pictBeaterGuiroScraper": {
        "codepoint": "U+E7DD",
        "description": "Guiro scraper"
    },
    "pictBeaterHammer": {
        "codepoint": "U+E7E1",
        "description": "Hammer"
    },
    "pictBeaterHammerMetalDown": {
        "codepoint": "U+E7D0",
        "description": "Metal hammer, down"
    },
    "pictBeaterHammerMetalUp": {
        "codepoint": "U+E7CF",
        "description": "Metal hammer, up"
    },
    "pictBeaterHammerPlasticDown": {
        "codepoint": "U+E7CE",
        "description": "Plastic hammer, down"
    },
    "pictBeaterHammerPlasticUp": {
        "codepoint": "U+E7CD",
        "description": "Plastic hammer, up"
    },
    "pictBeaterHammerWoodDown": {
        "codepoint": "U+E7CC",
        "description": "Wooden hammer, down"
    },
    "pictBeaterHammerWoodUp": {
        "codepoint": "U+E7CB",
        "description": "Wooden hammer, up"
    },
    "pictBeaterHand": {
        "codepoint": "U+E7E3",
        "description": "Hand"
    },
    "pictBeaterHardBassDrumDown": {
        "codepoint": "U+E79D",
        "description": "Hard bass drum stick down"
    },
    "pictBeaterHardBassDrumUp": {
        "codepoint": "U+E79C",
        "description": "Hard bass drum stick up"
    },
    "pictBeaterHardGlockenspielDown": {
        "codepoint": "U+E785",
        "description": "Hard glockenspiel stick down"
    },
    "pictBeaterHardGlockenspielLeft": {
        "codepoint": "U+E787",
        "description": "Hard glockenspiel stick left"
    },
    "pictBeaterHardGlockenspielRight": {
        "codepoint": "U+E786",
        "description": "Hard glockenspiel stick right"
    },
    "pictBeaterHardGlockenspielUp": {
        "codepoint": "U+E784",
        "description": "Hard glockenspiel stick up"
    },
    "pictBeaterHardTimpaniDown": {
        "codepoint": "U+E791",
        "description": "Hard timpani stick down"
    },
    "pictBeaterHardTimpaniLeft": {
        "codepoint": "U+E793",
        "description": "Hard timpani stick left"
    },
    "pictBeaterHardTimpaniRight": {
        "codepoint": "U+E792",
        "description": "Hard timpani stick right"
    },
    "pictBeaterHardTimpaniUp": {
        "codepoint": "U+E790",
        "description": "Hard timpani stick up"
    },
    "pictBeaterHardXylophoneDown": {
        "codepoint": "U+E779",
        "description": "Hard xylophone stick down"
    },
    "pictBeaterHardXylophoneLeft": {
        "codepoint": "U+E77B",
        "description": "Hard xylophone stick left"
    },
    "pictBeaterHardXylophoneRight": {
        "codepoint": "U+E77A",
        "description": "Hard xylophone stick right"
    },
    "pictBeaterHardXylophoneUp": {
        "codepoint": "U+E778",
        "description": "Hard xylophone stick up"
    },
    "pictBeaterHardYarnDown": {
        "codepoint": "U+E7AB",
        "description": "Hard yarn beater down"
    },
    "pictBeaterHardYarnLeft": {
        "codepoint": "U+E7AD",
        "description": "Hard yarn beater left"
    },
    "pictBeaterHardYarnRight": {
        "codepoint": "U+E7AC",
        "description": "Hard yarn beater right"
    },
    "pictBeaterHardYarnUp": {
        "codepoint": "U+E7AA",
        "description": "Hard yarn beater up"
    },
    "pictBeaterJazzSticksDown": {
        "codepoint": "U+E7D4",
        "description": "Jazz sticks down"
    },
    "pictBeaterJazzSticksUp": {
        "codepoint": "U+E7D3",
        "description": "Jazz sticks up"
    },
    "pictBeaterKnittingNeedle": {
        "codepoint": "U+E7E2",
        "description": "Knitting needle"
    },
    "pictBeaterMallet": {
        "codepoint": "U+E7DF",
        "description": "Chime hammer up"
    },
    "pictBeaterMalletDown": {
        "codepoint": "U+E7EC",
        "description": "Chime hammer down"
    },
    "pictBeaterMediumBassDrumDown": {
        "codepoint": "U+E79B",
        "description": "Medium bass drum stick down"
    },
    "pictBeaterMediumBassDrumUp": {
        "codepoint": "U+E79A",
        "description": "Medium bass drum stick up"
    },
    "pictBeaterMediumTimpaniDown": {
        "codepoint": "U+E78D",
        "description": "Medium timpani stick down"
    },
    "pictBeaterMediumTimpaniLeft": {
        "codepoint": "U+E78F",
        "description": "Medium timpani stick left"
    },
    "pictBeaterMediumTimpaniRight": {
        "codepoint": "U+E78E",
        "description": "Medium timpani stick right"
    },
    "pictBeaterMediumTimpaniUp": {
        "codepoint": "U+E78C",
        "description": "Medium timpani stick up"
    },
    "pictBeaterMediumXylophoneDown": {
        "codepoint": "U+E775",
        "description": "Medium xylophone stick down"
    },
    "pictBeaterMediumXylophoneLeft": {
        "codepoint": "U+E777",
        "description": "Medium xylophone stick left"
    },
    "pictBeaterMediumXylophoneRight": {
        "codepoint": "U+E776",
        "description": "Medium xylophone stick right"
    },
    "pictBeaterMediumXylophoneUp": {
        "codepoint": "U+E774",
        "description": "Medium xylophone stick up"
    },
    "pictBeaterMediumYarnDown": {
        "codepoint": "U+E7A7",
        "description": "Medium yarn beater down"
    },
    "pictBeaterMediumYarnLeft": {
        "codepoint": "U+E7A9",
        "description": "Medium yarn beater left"
    },
    "pictBeaterMediumYarnRight": {
        "codepoint": "U+E7A8",
        "description": "Medium yarn beater right"
    },
    "pictBeaterMediumYarnUp": {
        "codepoint": "U+E7A6",
        "description": "Medium yarn beater up"
    },
    "pictBeaterMetalBassDrumDown": {
        "codepoint": "U+E79F",
        "description": "Metal bass drum stick down"
    },
    "pictBeaterMetalBassDrumUp": {
        "codepoint": "U+E79E",
        "description": "Metal bass drum stick up"
    },
    "pictBeaterMetalDown": {
        "codepoint": "U+E7C8",
        "description": "Metal beater down"
    },
    "pictBeaterMetalHammer": {
        "codepoint": "U+E7E0",
        "description": "Metal hammer"
    },
    "pictBeaterMetalLeft": {
        "codepoint": "U+E7CA",
        "description": "Metal beater, left"
    },
    "pictBeaterMetalRight": {
        "codepoint": "U+E7C9",
        "description": "Metal beater, right"
    },
    "pictBeaterMetalUp": {
        "codepoint": "U+E7C7",
        "description": "Metal beater, up"
    },
    "pictBeaterSnareSticksDown": {
        "codepoint": "U+E7D2",
        "description": "Snare sticks down"
    },
    "pictBeaterSnareSticksUp": {
        "codepoint": "U+E7D1",
        "description": "Snare sticks up"
    },
    "pictBeaterSoftBassDrumDown": {
        "codepoint": "U+E799",
        "description": "Soft bass drum stick down"
    },
    "pictBeaterSoftBassDrumUp": {
        "codepoint": "U+E798",
        "description": "Soft bass drum stick up"
    },
    "pictBeaterSoftGlockenspielDown": {
        "codepoint": "U+E781",
        "description": "Soft glockenspiel stick down"
    },
    "pictBeaterSoftGlockenspielLeft": {
        "codepoint": "U+E783",
        "description": "Soft glockenspiel stick left"
    },
    "pictBeaterSoftGlockenspielRight": {
        "codepoint": "U+E782",
        "description": "Soft glockenspiel stick right"
    },
    "pictBeaterSoftGlockenspielUp": {
        "codepoint": "U+E780",
        "description": "Soft glockenspiel stick up"
    },
    "pictBeaterSoftTimpaniDown": {
        "codepoint": "U+E789",
        "description": "Soft timpani stick down"
    },
    "pictBeaterSoftTimpaniLeft": {
        "codepoint": "U+E78B",
        "description": "Soft timpani stick left"
    },
    "pictBeaterSoftTimpaniRight": {
        "codepoint": "U+E78A",
        "description": "Soft timpani stick right"
    },
    "pictBeaterSoftTimpaniUp": {
        "codepoint": "U+E788",
        "description": "Soft timpani stick up"
    },
    "pictBeaterSoftXylophone": {
        "codepoint": "U+E7DB",
        "description": "Soft xylophone beaters"
    },
    "pictBeaterSoftXylophoneDown": {
        "codepoint": "U+E771",
        "description": "Soft xylophone stick down"
    },
    "pictBeaterSoftXylophoneLeft": {
        "codepoint": "U+E773",
        "description": "Soft xylophone stick left"
    },
    "pictBeaterSoftXylophoneRight": {
        "codepoint": "U+E772",
        "description": "Soft xylophone stick right"
    },
    "pictBeaterSoftXylophoneUp": {
        "codepoint": "U+E770",
        "description": "Soft xylophone stick up"
    },
    "pictBeaterSoftYarnDown": {
        "codepoint": "U+E7A3",
        "description": "Soft yarn beater down"
    },
    "pictBeaterSoftYarnLeft": {
        "codepoint": "U+E7A5",
        "description": "Soft yarn beater left"
    },
    "pictBeaterSoftYarnRight": {
        "codepoint": "U+E7A4",
        "description": "Soft yarn beater right"
    },
    "pictBeaterSoftYarnUp": {
        "codepoint": "U+E7A2",
        "description": "Soft yarn beater up"
    },
    "pictBeaterSpoonWoodenMallet": {
        "codepoint": "U+E7DC",
        "description": "Spoon-shaped wooden mallet"
    },
    "pictBeaterSuperballDown": {
        "codepoint": "U+E7AF",
        "description": "Superball beater down"
    },
    "pictBeaterSuperballLeft": {
        "codepoint": "U+E7B1",
        "description": "Superball beater left"
    },
    "pictBeaterSuperballRight": {
        "codepoint": "U+E7B0",
        "description": "Superball beater right"
    },
    "pictBeaterSuperballUp": {
        "codepoint": "U+E7AE",
        "description": "Superball beater up"
    },
    "pictBeaterTriangleDown": {
        "codepoint": "U+E7D6",
        "description": "Triangle beater down"
    },
    "pictBeaterTrianglePlain": {
        "codepoint": "U+E7EF",
        "description": "Triangle beater plain"
    },
    "pictBeaterTriangleUp": {
        "codepoint": "U+E7D5",
        "description": "Triangle beater up"
    },
    "pictBeaterWireBrushesDown": {
        "codepoint": "U+E7D8",
        "description": "Wire brushes down"
    },
    "pictBeaterWireBrushesUp": {
        "codepoint": "U+E7D7",
        "description": "Wire brushes up"
    },
    "pictBeaterWoodTimpaniDown": {
        "codepoint": "U+E795",
        "description": "Wood timpani stick down"
    },
    "pictBeaterWoodTimpaniLeft": {
        "codepoint": "U+E797",
        "description": "Wood timpani stick left"
    },
    "pictBeaterWoodTimpaniRight": {
        "codepoint": "U+E796",
        "description": "Wood timpani stick right"
    },
    "pictBeaterWoodTimpaniUp": {
        "codepoint": "U+E794",
        "description": "Wood timpani stick up"
    },
    "pictBeaterWoodXylophoneDown": {
        "codepoint": "U+E77D",
        "description": "Wood xylophone stick down"
    },
    "pictBeaterWoodXylophoneLeft": {
        "codepoint": "U+E77F",
        "description": "Wood xylophone stick left"
    },
    "pictBeaterWoodXylophoneRight": {
        "codepoint": "U+E77E",
        "description": "Wood xylophone stick right"
    },
    "pictBeaterWoodXylophoneUp": {
        "codepoint": "U+E77C",
        "description": "Wood xylophone stick up"
    },
    "pictBell": {
        "codepoint": "U+E714",
        "description": "Bell"
    },
    "pictBellOfCymbal": {
        "codepoint": "U+E72A",
        "description": "Bell of cymbal"
    },
    "pictBellPlate": {
        "codepoint": "U+E713",
        "description": "Bell plate"
    },
    "pictBellTree": {
        "codepoint": "U+E71A",
        "description": "Bell tree"
    },
    "pictBirdWhistle": {
        "codepoint": "U+E751",
        "description": "Bird whistle"
    },
    "pictBoardClapper": {
        "codepoint": "U+E6F7",
        "description": "Board clapper"
    },
    "pictBongos": {
        "codepoint": "U+E6DD",
        "description": "Bongos"
    },
    "pictBrakeDrum": {
        "codepoint": "U+E6E1",
        "description": "Brake drum"
    },
    "pictCabasa": {
        "codepoint": "U+E743",
        "description": "Cabasa"
    },
    "pictCannon": {
        "codepoint": "U+E761",
        "description": "Cannon"
    },
    "pictCarHorn": {
        "codepoint": "U+E755",
        "description": "Car horn"
    },
    "pictCastanets": {
        "codepoint": "U+E6F8",
        "description": "Castanets"
    },
    "pictCastanetsWithHandle": {
        "codepoint": "U+E6F9",
        "description": "Castanets with handle"
    },
    "pictCelesta": {
        "codepoint": "U+E6B0",
        "description": "Celesta"
    },
    "pictCencerro": {
        "codepoint": "U+E716",
        "description": "Cencerro"
    },
    "pictCenter1": {
        "codepoint": "U+E7FE",
        "description": "Center (Weinberg)"
    },
    "pictCenter2": {
        "codepoint": "U+E7FF",
        "description": "Center (Ghent)"
    },
    "pictCenter3": {
        "codepoint": "U+E800",
        "description": "Center (Caltabiano)"
    },
    "pictChainRattle": {
        "codepoint": "U+E748",
        "description": "Chain rattle"
    },
    "pictChimes": {
        "codepoint": "U+E6C2",
        "description": "Chimes"
    },
    "pictChineseCymbal": {
        "codepoint": "U+E726",
        "description": "Chinese cymbal"
    },
    "pictChokeCymbal": {
        "codepoint": "U+E805",
        "description": "Choke (Weinberg)"
    },
    "pictClaves": {
        "codepoint": "U+E6F2",
        "description": "Claves"
    },
    "pictCoins": {
        "codepoint": "U+E7E7",
        "description": "Coins"
    },
    "pictConga": {
        "codepoint": "U+E6DE",
        "description": "Conga"
    },
    "pictCowBell": {
        "codepoint": "U+E711",
        "description": "Cow bell"
    },
    "pictCrashCymbals": {
        "codepoint": "U+E720",
        "description": "Crash cymbals"
    },
    "pictCrotales": {
        "codepoint": "U+E6AE",
        "description": "Crotales"
    },
    "pictCrushStem": {
        "codepoint": "U+E80C",
        "description": "Combining crush for stem"
    },
    "pictCuica": {
        "codepoint": "U+E6E4",
        "description": "Cuica"
    },
    "pictCymbalTongs": {
        "codepoint": "U+E728",
        "description": "Cymbal tongs"
    },
    "pictDamp1": {
        "codepoint": "U+E7F9",
        "description": "Damp"
    },
    "pictDamp2": {
        "codepoint": "U+E7FA",
        "description": "Damp 2"
    },
    "pictDamp3": {
        "codepoint": "U+E7FB",
        "description": "Damp 3"
    },
    "pictDamp4": {
        "codepoint": "U+E7FC",
        "description": "Damp 4"
    },
    "pictDeadNoteStem": {
        "codepoint": "U+E80D",
        "description": "Combining X for stem (dead note)"
    },
    "pictDrumStick": {
        "codepoint": "U+E7E8",
        "description": "Drum stick"
    },
    "pictDuckCall": {
        "codepoint": "U+E757",
        "description": "Duck call"
    },
    "pictEdgeOfCymbal": {
        "codepoint": "U+E729",
        "description": "Edge of cymbal"
    },
    "pictEmptyTrap": {
        "codepoint": "U+E6A9",
        "description": "Empty trapezoid"
    },
    "pictFingerCymbals": {
        "codepoint": "U+E727",
        "description": "Finger cymbals"
    },
    "pictFlexatone": {
        "codepoint": "U+E740",
        "description": "Flexatone"
    },
    "pictFootballRatchet": {
        "codepoint": "U+E6F5",
        "description": "Football rattle"
    },
    "pictGlassHarmonica": {
        "codepoint": "U+E765",
        "description": "Glass harmonica"
    },
    "pictGlassHarp": {
        "codepoint": "U+E764",
        "description": "Glass harp"
    },
    "pictGlassPlateChimes": {
        "codepoint": "U+E6C6",
        "description": "Glass plate chimes"
    },
    "pictGlassTubeChimes": {
        "codepoint": "U+E6C5",
        "description": "Glass tube chimes"
    },
    "pictGlsp": {
        "codepoint": "U+E6A0",
        "description": "Glockenspiel"
    },
    "pictGlspSmithBrindle": {
        "codepoint": "U+E6AA",
        "description": "Glockenspiel (Smith Brindle)"
    },
    "pictGobletDrum": {
        "codepoint": "U+E6E2",
        "description": "Goblet drum (djembe, dumbek)"
    },
    "pictGong": {
        "codepoint": "U+E732",
        "description": "Gong"
    },
    "pictGongWithButton": {
        "codepoint": "U+E733",
        "description": "Gong with button (nipple)"
    },
    "pictGuiro": {
        "codepoint": "U+E6F3",
        "description": "Guiro"
    },
    "pictGumHardDown": {
        "codepoint": "U+E7C4",
        "description": "Hard gum beater, down"
    },
    "pictGumHardLeft": {
        "codepoint": "U+E7C6",
        "description": "Hard gum beater, left"
    },
    "pictGumHardRight": {
        "codepoint": "U+E7C5",
        "description": "Hard gum beater, right"
    },
    "pictGumHardUp": {
        "codepoint": "U+E7C3",
        "description": "Hard gum beater, up"
    },
    "pictGumMediumDown": {
        "codepoint": "U+E7C0",
        "description": "Medium gum beater, down"
    },
    "pictGumMediumLeft": {
        "codepoint": "U+E7C2",
        "description": "Medium gum beater, left"
    },
    "pictGumMediumRight": {
        "codepoint": "U+E7C1",
        "description": "Medium gum beater, right"
    },
    "pictGumMediumUp": {
        "codepoint": "U+E7BF",
        "description": "Medium gum beater, up"
    },
    "pictGumSoftDown": {
        "codepoint": "U+E7BC",
        "description": "Soft gum beater, down"
    },
    "pictGumSoftLeft": {
        "codepoint": "U+E7BE",
        "description": "Soft gum beater, left"
    },
    "pictGumSoftRight": {
        "codepoint": "U+E7BD",
        "description": "Soft gum beater, right"
    },
    "pictGumSoftUp": {
        "codepoint": "U+E7BB",
        "description": "Soft gum beater, up"
    },
    "pictHalfOpen1": {
        "codepoint": "U+E7F6",
        "description": "Half-open"
    },
    "pictHalfOpen2": {
        "codepoint": "U+E7F7",
        "description": "Half-open 2 (Weinberg)"
    },
    "pictHandbell": {
        "codepoint": "U+E715",
        "description": "Handbell"
    },
    "pictHiHat": {
        "codepoint": "U+E722",
        "description": "Hi-hat"
    },
    "pictHiHatOnStand": {
        "codepoint": "U+E723",
        "description": "Hi-hat cymbals on stand"
    },
    "pictJawHarp": {
        "codepoint": "U+E767",
        "description": "Jaw harp"
    },
    "pictJingleBells": {
        "codepoint": "U+E719",
        "description": "Jingle bells"
    },
    "pictKlaxonHorn": {
        "codepoint": "U+E756",
        "description": "Klaxon horn"
    },
    "pictLeftHandCircle": {
        "codepoint": "U+E807",
        "description": "Right hand (Agostini)"
    },
    "pictLionsRoar": {
        "codepoint": "U+E763",
        "description": "Lion's roar"
    },
    "pictLithophone": {
        "codepoint": "U+E6B1",
        "description": "Lithophone"
    },
    "pictLogDrum": {
        "codepoint": "U+E6DF",
        "description": "Log drum"
    },
    "pictLotusFlute": {
        "codepoint": "U+E75A",
        "description": "Lotus flute"
    },
    "pictMar": {
        "codepoint": "U+E6A6",
        "description": "Marimba"
    },
    "pictMarSmithBrindle": {
        "codepoint": "U+E6AC",
        "description": "Marimba (Smith Brindle)"
    },
    "pictMaraca": {
        "codepoint": "U+E741",
        "description": "Maraca"
    },
    "pictMaracas": {
        "codepoint": "U+E742",
        "description": "Maracas"
    },
    "pictMegaphone": {
        "codepoint": "U+E759",
        "description": "Megaphone"
    },
    "pictMetalPlateChimes": {
        "codepoint": "U+E6C8",
        "description": "Metal plate chimes"
    },
    "pictMetalTubeChimes": {
        "codepoint": "U+E6C7",
        "description": "Metal tube chimes"
    },
    "pictMusicalSaw": {
        "codepoint": "U+E766",
        "description": "Musical saw"
    },
    "pictNormalPosition": {
        "codepoint": "U+E804",
        "description": "Normal position (Caltabiano)"
    },
    "pictOnRim": {
        "codepoint": "U+E7F4",
        "description": "On rim"
    },
    "pictOpen": {
        "codepoint": "U+E7F8",
        "description": "Open"
    },
    "pictOpenRimShot": {
        "codepoint": "U+E7F5",
        "description": "Closed / rim shot"
    },
    "pictPistolShot": {
        "codepoint": "U+E760",
        "description": "Pistol shot"
    },
    "pictPoliceWhistle": {
        "codepoint": "U+E752",
        "description": "Police whistle"
    },
    "pictQuijada": {
        "codepoint": "U+E6FA",
        "description": "Quijada (jawbone)"
    },
    "pictRainstick": {
        "codepoint": "U+E747",
        "description": "Rainstick"
    },
    "pictRatchet": {
        "codepoint": "U+E6F4",
        "description": "Ratchet"
    },
    "pictRecoReco": {
        "codepoint": "U+E6FC",
        "description": "Reco-reco"
    },
    "pictRightHandSquare": {
        "codepoint": "U+E806",
        "description": "Left hand (Agostini)"
    },
    "pictRim1": {
        "codepoint": "U+E801",
        "description": "Rim or edge (Weinberg)"
    },
    "pictRim2": {
        "codepoint": "U+E802",
        "description": "Rim (Ghent)"
    },
    "pictRim3": {
        "codepoint": "U+E803",
        "description": "Rim (Caltabiano)"
    },
    "pictRimShotOnStem": {
        "codepoint": "U+E7FD",
        "description": "Rim shot for stem"
    },
    "pictSandpaperBlocks": {
        "codepoint": "U+E762",
        "description": "Sandpaper blocks"
    },
    "pictScrapeAroundRim": {
        "codepoint": "U+E7F3",
        "description": "Scrape around rim (counter-clockwise)"
    },
    "pictScrapeAroundRimClockwise": {
        "codepoint": "U+E80E",
        "description": "Scrape around rim (clockwise)"
    },
    "pictScrapeCenterToEdge": {
        "codepoint": "U+E7F1",
        "description": "Scrape from center to edge"
    },
    "pictScrapeEdgeToCenter": {
        "codepoint": "U+E7F2",
        "description": "Scrape from edge to center"
    },
    "pictShellBells": {
        "codepoint": "U+E718",
        "description": "Shell bells"
    },
    "pictShellChimes": {
        "codepoint": "U+E6C4",
        "description": "Shell chimes"
    },
    "pictSiren": {
        "codepoint": "U+E753",
        "description": "Siren"
    },
    "pictSistrum": {
        "codepoint": "U+E746",
        "description": "Sistrum"
    },
    "pictSizzleCymbal": {
        "codepoint": "U+E724",
        "description": "Sizzle cymbal"
    },
    "pictSleighBell": {
        "codepoint": "U+E710",
        "description": "Sleigh bell"
    },
    "pictSlideBrushOnGong": {
        "codepoint": "U+E734",
        "description": "Slide brush on gong"
    },
    "pictSlideWhistle": {
        "codepoint": "U+E750",
        "description": "Slide whistle"
    },
    "pictSlitDrum": {
        "codepoint": "U+E6E0",
        "description": "Slit drum"
    },
    "pictSnareDrum": {
        "codepoint": "U+E6D1",
        "description": "Snare drum"
    },
    "pictSnareDrumMilitary": {
        "codepoint": "U+E6D3",
        "description": "Military snare drum"
    },
    "pictSnareDrumSnaresOff": {
        "codepoint": "U+E6D2",
        "description": "Snare drum, snares off"
    },
    "pictSteelDrums": {
        "codepoint": "U+E6AF",
        "description": "Steel drums"
    },
    "pictStickShot": {
        "codepoint": "U+E7F0",
        "description": "Stick shot"
    },
    "pictSuperball": {
        "codepoint": "U+E7B2",
        "description": "Superball"
    },
    "pictSuspendedCymbal": {
        "codepoint": "U+E721",
        "description": "Suspended cymbal"
    },
    "pictSwishStem": {
        "codepoint": "U+E808",
        "description": "Combining swish for stem"
    },
    "pictTabla": {
        "codepoint": "U+E6E3",
        "description": "Indian tabla"
    },
    "pictTamTam": {
        "codepoint": "U+E730",
        "description": "Tam-tam"
    },
    "pictTamTamWithBeater": {
        "codepoint": "U+E731",
        "description": "Tam-tam with beater (Smith Brindle)"
    },
    "pictTambourine": {
        "codepoint": "U+E6DB",
        "description": "Tambourine"
    },
    "pictTempleBlocks": {
        "codepoint": "U+E6F1",
        "description": "Temple blocks"
    },
    "pictTenorDrum": {
        "codepoint": "U+E6D6",
        "description": "Tenor drum"
    },
    "pictThundersheet": {
        "codepoint": "U+E744",
        "description": "Thundersheet"
    },
    "pictTimbales": {
        "codepoint": "U+E6DC",
        "description": "Timbales"
    },
    "pictTimpani": {
        "codepoint": "U+E6D0",
        "description": "Timpani"
    },
    "pictTomTom": {
        "codepoint": "U+E6D7",
        "description": "Tom-tom"
    },
    "pictTomTomChinese": {
        "codepoint": "U+E6D8",
        "description": "Chinese tom-tom"
    },
    "pictTomTomIndoAmerican": {
        "codepoint": "U+E6DA",
        "description": "Indo-American tom tom"
    },
    "pictTomTomJapanese": {
        "codepoint": "U+E6D9",
        "description": "Japanese tom-tom"
    },
    "pictTriangle": {
        "codepoint": "U+E700",
        "description": "Triangle"
    },
    "pictTubaphone": {
        "codepoint": "U+E6B2",
        "description": "Tubaphone"
    },
    "pictTubularBells": {
        "codepoint": "U+E6C0",
        "description": "Tubular bells"
    },
    "pictTurnLeftStem": {
        "codepoint": "U+E80A",
        "description": "Combining turn left for stem"
    },
    "pictTurnRightLeftStem": {
        "codepoint": "U+E80B",
        "description": "Combining turn left or right for stem"
    },
    "pictTurnRightStem": {
        "codepoint": "U+E809",
        "description": "Combining turn right for stem"
    },
    "pictVib": {
        "codepoint": "U+E6A7",
        "description": "Vibraphone"
    },
    "pictVibMotorOff": {
        "codepoint": "U+E6A8",
        "description": "Metallophone (vibraphone motor off)"
    },
    "pictVibSmithBrindle": {
        "codepoint": "U+E6AD",
        "description": "Vibraphone (Smith Brindle)"
    },
    "pictVibraslap": {
        "codepoint": "U+E745",
        "description": "Vibraslap"
    },
    "pictVietnameseHat": {
        "codepoint": "U+E725",
        "description": "Vietnamese hat cymbal"
    },
    "pictWhip": {
        "codepoint": "U+E6F6",
        "description": "Whip"
    },
    "pictWindChimesGlass": {
        "codepoint": "U+E6C1",
        "description": "Wind chimes (glass)"
    },
    "pictWindMachine": {
        "codepoint": "U+E754",
        "description": "Wind machine"
    },
    "pictWindWhistle": {
        "codepoint": "U+E758",
        "description": "Wind whistle (or mouth siren)"
    },
    "pictWoodBlock": {
        "codepoint": "U+E6F0",
        "description": "Wood block"
    },
    "pictWoundHardDown": {
        "codepoint": "U+E7B4",
        "description": "Wound beater, hard core down"
    },
    "pictWoundHardLeft": {
        "codepoint": "U+E7B6",
        "description": "Wound beater, hard core left"
    },
    "pictWoundHardRight": {
        "codepoint": "U+E7B5",
        "description": "Wound beater, hard core right"
    },
    "pictWoundHardUp": {
        "codepoint": "U+E7B3",
        "description": "Wound beater, hard core up"
    },
    "pictWoundSoftDown": {
        "codepoint": "U+E7B8",
        "description": "Wound beater, soft core down"
    },
    "pictWoundSoftLeft": {
        "codepoint": "U+E7BA",
        "description": "Wound beater, soft core left"
    },
    "pictWoundSoftRight": {
        "codepoint": "U+E7B9",
        "description": "Wound beater, soft core right"
    },
    "pictWoundSoftUp": {
        "codepoint": "U+E7B7",
        "description": "Wound beater, soft core up"
    },
    "pictXyl": {
        "codepoint": "U+E6A1",
        "description": "Xylophone"
    },
    "pictXylBass": {
        "codepoint": "U+E6A3",
        "description": "Bass xylophone"
    },
    "pictXylSmithBrindle": {
        "codepoint": "U+E6AB",
        "description": "Xylophone (Smith Brindle)"
    },
    "pictXylTenor": {
        "codepoint": "U+E6A2",
        "description": "Tenor xylophone"
    },
    "pictXylTenorTrough": {
        "codepoint": "U+E6A5",
        "description": "Trough tenor xylophone"
    },
    "pictXylTrough": {
        "codepoint": "U+E6A4",
        "description": "Trough xylophone"
    },
    "pluckedBuzzPizzicato": {
        "codepoint": "U+E632",
        "description": "Buzz pizzicato"
    },
    "pluckedDamp": {
        "alternateCodepoint": "U+1D1B4",
        "codepoint": "U+E638",
        "description": "Damp"
    },
    "pluckedDampAll": {
        "alternateCodepoint": "U+1D1B5",
        "codepoint": "U+E639",
        "description": "Damp all"
    },
    "pluckedDampOnStem": {
        "codepoint": "U+E63B",
        "description": "Damp for stem"
    },
    "pluckedFingernailFlick": {
        "codepoint": "U+E637",
        "description": "Fingernail flick"
    },
    "pluckedLeftHandPizzicato": {
        "codepoint": "U+E633",
        "description": "Left-hand pizzicato"
    },
    "pluckedPlectrum": {
        "codepoint": "U+E63A",
        "description": "Plectrum"
    },
    "pluckedSnapPizzicatoAbove": {
        "codepoint": "U+E631",
        "description": "Snap pizzicato above"
    },
    "pluckedSnapPizzicatoBelow": {
        "alternateCodepoint": "U+1D1AD",
        "codepoint": "U+E630",
        "description": "Snap pizzicato below"
    },
    "pluckedWithFingernails": {
        "alternateCodepoint": "U+1D1B3",
        "codepoint": "U+E636",
        "description": "With fingernails"
    },
    "quindicesima": {
        "codepoint": "U+E514",
        "description": "Quindicesima"
    },
    "quindicesimaAlta": {
        "codepoint": "U+E515",
        "description": "Quindicesima alta"
    },
    "quindicesimaBassa": {
        "alternateCodepoint": "U+1D139",
        "codepoint": "U+E516",
        "description": "Quindicesima bassa"
    },
    "quindicesimaBassaMb": {
        "codepoint": "U+E51D",
        "description": "Quindicesima bassa (mb)"
    },
    "repeat1Bar": {
        "alternateCodepoint": "U+1D10E",
        "codepoint": "U+E500",
        "description": "Repeat last bar"
    },
    "repeat2Bars": {
        "alternateCodepoint": "U+1D10F",
        "codepoint": "U+E501",
        "description": "Repeat last two bars"
    },
    "repeat4Bars": {
        "codepoint": "U+E502",
        "description": "Repeat last four bars"
    },
    "repeatBarLowerDot": {
        "codepoint": "U+E505",
        "description": "Repeat bar lower dot"
    },
    "repeatBarSlash": {
        "codepoint": "U+E504",
        "description": "Repeat bar slash"
    },
    "repeatBarUpperDot": {
        "codepoint": "U+E503",
        "description": "Repeat bar upper dot"
    },
    "repeatDot": {
        "codepoint": "U+E044",
        "description": "Single repeat dot"
    },
    "repeatDots": {
        "alternateCodepoint": "U+1D108",
        "codepoint": "U+E043",
        "description": "Repeat dots"
    },
    "repeatLeft": {
        "alternateCodepoint": "U+1D106",
        "codepoint": "U+E040",
        "description": "Left (start) repeat sign"
    },
    "repeatRight": {
        "alternateCodepoint": "U+1D107",
        "codepoint": "U+E041",
        "description": "Right (end) repeat sign"
    },
    "repeatRightLeft": {
        "codepoint": "U+E042",
        "description": "Right and left repeat sign"
    },
    "rest1024th": {
        "codepoint": "U+E4ED",
        "description": "1024th rest"
    },
    "rest128th": {
        "alternateCodepoint": "U+1D142",
        "codepoint": "U+E4EA",
        "description": "128th (semihemidemisemiquaver) rest"
    },
    "rest16th": {
        "alternateCodepoint": "U+1D13F",
        "codepoint": "U+E4E7",
        "description": "16th (semiquaver) rest"
    },
    "rest256th": {
        "codepoint": "U+E4EB",
        "description": "256th rest"
    },
    "rest32nd": {
        "alternateCodepoint": "U+1D140",
        "codepoint": "U+E4E8",
        "description": "32nd (demisemiquaver) rest"
    },
    "rest512th": {
        "codepoint": "U+E4EC",
        "description": "512th rest"
    },
    "rest64th": {
        "alternateCodepoint": "U+1D141",
        "codepoint": "U+E4E9",
        "description": "64th (hemidemisemiquaver) rest"
    },
    "rest8th": {
        "alternateCodepoint": "U+1D13E",
        "codepoint": "U+E4E6",
        "description": "Eighth (quaver) rest"
    },
    "restDoubleWhole": {
        "alternateCodepoint": "U+1D13A",
        "codepoint": "U+E4E2",
        "description": "Double whole (breve) rest"
    },
    "restDoubleWholeLegerLine": {
        "codepoint": "U+E4F3",
        "description": "Double whole rest on leger lines"
    },
    "restHBar": {
        "alternateCodepoint": "U+1D129",
        "codepoint": "U+E4EE",
        "description": "Multiple measure rest"
    },
    "restHBarLeft": {
        "codepoint": "U+E4EF",
        "description": "H-bar, left half"
    },
    "restHBarMiddle": {
        "codepoint": "U+E4F0",
        "description": "H-bar, middle"
    },
    "restHBarRight": {
        "codepoint": "U+E4F1",
        "description": "H-bar, right half"
    },
    "restHalf": {
        "alternateCodepoint": "U+1D13C",
        "codepoint": "U+E4E4",
        "description": "Half (minim) rest"
    },
    "restHalfLegerLine": {
        "codepoint": "U+E4F5",
        "description": "Half rest on leger line"
    },
    "restLonga": {
        "codepoint": "U+E4E1",
        "description": "Longa rest"
    },
    "restMaxima": {
        "codepoint": "U+E4E0",
        "description": "Maxima rest"
    },
    "restQuarter": {
        "alternateCodepoint": "U+1D13D",
        "codepoint": "U+E4E5",
        "description": "Quarter (crotchet) rest"
    },
    "restQuarterOld": {
        "codepoint": "U+E4F2",
        "description": "Old-style quarter (crotchet) rest"
    },
    "restQuarterZ": {
        "codepoint": "U+E4F6",
        "description": "Z-style quarter (crotchet) rest"
    },
    "restWhole": {
        "alternateCodepoint": "U+1D13B",
        "codepoint": "U+E4E3",
        "description": "Whole (semibreve) rest"
    },
    "restWholeLegerLine": {
        "codepoint": "U+E4F4",
        "description": "Whole rest on leger line"
    },
    "reversedBrace": {
        "codepoint": "U+E001",
        "description": "Reversed brace"
    },
    "reversedBracketBottom": {
        "codepoint": "U+E006",
        "description": "Reversed bracket bottom"
    },
    "reversedBracketTop": {
        "codepoint": "U+E005",
        "description": "Reversed bracket top"
    },
    "rightRepeatSmall": {
        "codepoint": "U+E04D",
        "description": "Right repeat sign within bar"
    },
    "schaefferClef": {
        "codepoint": "U+E06F",
        "description": "Sch\u00e4ffer clef"
    },
    "schaefferFClefToGClef": {
        "codepoint": "U+E072",
        "description": "Sch\u00e4ffer F clef to G clef change"
    },
    "schaefferGClefToFClef": {
        "codepoint": "U+E071",
        "description": "Sch\u00e4ffer G clef to F clef change"
    },
    "schaefferPreviousClef": {
        "codepoint": "U+E070",
        "description": "Sch\u00e4ffer previous clef"
    },
    "segno": {
        "alternateCodepoint": "U+1D10B",
        "codepoint": "U+E047",
        "description": "Segno"
    },
    "segnoSerpent1": {
        "codepoint": "U+E04A",
        "description": "Segno (serpent)"
    },
    "segnoSerpent2": {
        "codepoint": "U+E04B",
        "description": "Segno (serpent with vertical lines)"
    },
    "semipitchedPercussionClef1": {
        "codepoint": "U+E06B",
        "description": "Semi-pitched percussion clef 1"
    },
    "semipitchedPercussionClef2": {
        "codepoint": "U+E06C",
        "description": "Semi-pitched percussion clef 2"
    },
    "smnFlat": {
        "codepoint": "U+EC52",
        "description": "Flat"
    },
    "smnFlatWhite": {
        "codepoint": "U+EC53",
        "description": "Flat (white)"
    },
    "smnHistoryDoubleFlat": {
        "codepoint": "U+EC57",
        "description": "Double flat history sign"
    },
    "smnHistoryDoubleSharp": {
        "codepoint": "U+EC55",
        "description": "Double sharp history sign"
    },
    "smnHistoryFlat": {
        "codepoint": "U+EC56",
        "description": "Flat history sign"
    },
    "smnHistorySharp": {
        "codepoint": "U+EC54",
        "description": "Sharp history sign"
    },
    "smnNatural": {
        "codepoint": "U+EC58",
        "description": "Natural (N)"
    },
    "smnSharp": {
        "codepoint": "U+EC50",
        "description": "Sharp stem up"
    },
    "smnSharpDown": {
        "codepoint": "U+EC59",
        "description": "Sharp stem down"
    },
    "smnSharpWhite": {
        "codepoint": "U+EC51",
        "description": "Sharp (white) stem up"
    },
    "smnSharpWhiteDown": {
        "codepoint": "U+EC5A",
        "description": "Sharp (white) stem down"
    },
    "splitBarDivider": {
        "codepoint": "U+E00A",
        "description": "Split bar divider (bar spans a system break)"
    },
    "staff1Line": {
        "alternateCodepoint": "U+1D116",
        "codepoint": "U+E010",
        "description": "1-line staff"
    },
    "staff1LineNarrow": {
        "codepoint": "U+E01C",
        "description": "1-line staff (narrow)"
    },
    "staff1LineWide": {
        "codepoint": "U+E016",
        "description": "1-line staff (wide)"
    },
    "staff2Lines": {
        "alternateCodepoint": "U+1D117",
        "codepoint": "U+E011",
        "description": "2-line staff"
    },
    "staff2LinesNarrow": {
        "codepoint": "U+E01D",
        "description": "2-line staff (narrow)"
    },
    "staff2LinesWide": {
        "codepoint": "U+E017",
        "description": "2-line staff (wide)"
    },
    "staff3Lines": {
        "alternateCodepoint": "U+1D118",
        "codepoint": "U+E012",
        "description": "3-line staff"
    },
    "staff3LinesNarrow": {
        "codepoint": "U+E01E",
        "description": "3-line staff (narrow)"
    },
    "staff3LinesWide": {
        "codepoint": "U+E018",
        "description": "3-line staff (wide)"
    },
    "staff4Lines": {
        "alternateCodepoint": "U+1D119",
        "codepoint": "U+E013",
        "description": "4-line staff"
    },
    "staff4LinesNarrow": {
        "codepoint": "U+E01F",
        "description": "4-line staff (narrow)"
    },
    "staff4LinesWide": {
        "codepoint": "U+E019",
        "description": "4-line staff (wide)"
    },
    "staff5Lines": {
        "alternateCodepoint": "U+1D11A",
        "codepoint": "U+E014",
        "description": "5-line staff"
    },
    "staff5LinesNarrow": {
        "codepoint": "U+E020",
        "description": "5-line staff (narrow)"
    },
    "staff5LinesWide": {
        "codepoint": "U+E01A",
        "description": "5-line staff (wide)"
    },
    "staff6Lines": {
        "alternateCodepoint": "U+1D11B",
        "codepoint": "U+E015",
        "description": "6-line staff"
    },
    "staff6LinesNarrow": {
        "codepoint": "U+E021",
        "description": "6-line staff (narrow)"
    },
    "staff6LinesWide": {
        "codepoint": "U+E01B",
        "description": "6-line staff (wide)"
    },
    "staffDivideArrowDown": {
        "codepoint": "U+E00B",
        "description": "Staff divide arrow down"
    },
    "staffDivideArrowUp": {
        "codepoint": "U+E00C",
        "description": "Staff divide arrow up"
    },
    "staffDivideArrowUpDown": {
        "codepoint": "U+E00D",
        "description": "Staff divide arrows"
    },
    "staffPosLower1": {
        "codepoint": "U+EB98",
        "description": "Lower 1 staff position"
    },
    "staffPosLower2": {
        "codepoint": "U+EB99",
        "description": "Lower 2 staff positions"
    },
    "staffPosLower3": {
        "codepoint": "U+EB9A",
        "description": "Lower 3 staff positions"
    },
    "staffPosLower4": {
        "codepoint": "U+EB9B",
        "description": "Lower 4 staff positions"
    },
    "staffPosLower5": {
        "codepoint": "U+EB9C",
        "description": "Lower 5 staff positions"
    },
    "staffPosLower6": {
        "codepoint": "U+EB9D",
        "description": "Lower 6 staff positions"
    },
    "staffPosLower7": {
        "codepoint": "U+EB9E",
        "description": "Lower 7 staff positions"
    },
    "staffPosLower8": {
        "codepoint": "U+EB9F",
        "description": "Lower 8 staff positions"
    },
    "staffPosRaise1": {
        "codepoint": "U+EB90",
        "description": "Raise 1 staff position"
    },
    "staffPosRaise2": {
        "codepoint": "U+EB91",
        "description": "Raise 2 staff positions"
    },
    "staffPosRaise3": {
        "codepoint": "U+EB92",
        "description": "Raise 3 staff positions"
    },
    "staffPosRaise4": {
        "codepoint": "U+EB93",
        "description": "Raise 4 staff positions"
    },
    "staffPosRaise5": {
        "codepoint": "U+EB94",
        "description": "Raise 5 staff positions"
    },
    "staffPosRaise6": {
        "codepoint": "U+EB95",
        "description": "Raise 6 staff positions"
    },
    "staffPosRaise7": {
        "codepoint": "U+EB96",
        "description": "Raise 7 staff positions"
    },
    "staffPosRaise8": {
        "codepoint": "U+EB97",
        "description": "Raise 8 staff positions"
    },
    "stem": {
        "alternateCodepoint": "U+1D165",
        "codepoint": "U+E210",
        "description": "Combining stem"
    },
    "stemBowOnBridge": {
        "codepoint": "U+E215",
        "description": "Combining bow on bridge stem"
    },
    "stemBowOnTailpiece": {
        "codepoint": "U+E216",
        "description": "Combining bow on tailpiece stem"
    },
    "stemBuzzRoll": {
        "codepoint": "U+E217",
        "description": "Combining buzz roll stem"
    },
    "stemDamp": {
        "codepoint": "U+E218",
        "description": "Combining damp stem"
    },
    "stemHarpStringNoise": {
        "codepoint": "U+E21F",
        "description": "Combining harp string noise stem"
    },
    "stemMultiphonicsBlack": {
        "codepoint": "U+E21A",
        "description": "Combining multiphonics (black) stem"
    },
    "stemMultiphonicsBlackWhite": {
        "codepoint": "U+E21C",
        "description": "Combining multiphonics (black and white) stem"
    },
    "stemMultiphonicsWhite": {
        "codepoint": "U+E21B",
        "description": "Combining multiphonics (white) stem"
    },
    "stemPendereckiTremolo": {
        "codepoint": "U+E213",
        "description": "Combining Penderecki unmeasured tremolo stem"
    },
    "stemRimShot": {
        "codepoint": "U+E21E",
        "description": "Combining rim shot stem"
    },
    "stemSprechgesang": {
        "alternateCodepoint": "U+1D166",
        "codepoint": "U+E211",
        "description": "Combining sprechgesang stem"
    },
    "stemSulPonticello": {
        "codepoint": "U+E214",
        "description": "Combining sul ponticello (bow behind bridge) stem"
    },
    "stemSussurando": {
        "codepoint": "U+E21D",
        "description": "Combining sussurando stem"
    },
    "stemSwished": {
        "codepoint": "U+E212",
        "description": "Combining swished stem"
    },
    "stemVibratoPulse": {
        "codepoint": "U+E219",
        "description": "Combining vibrato pulse accent (Saunders) stem"
    },
    "stockhausenTremolo": {
        "codepoint": "U+E232",
        "description": "Stockhausen irregular tremolo (\"Morsen\", like Morse code)"
    },
    "stringsBowBehindBridge": {
        "codepoint": "U+E618",
        "description": "Bow behind bridge (sul ponticello)"
    },
    "stringsBowBehindBridgeFourStrings": {
        "codepoint": "U+E62A",
        "description": "Bow behind bridge on four strings"
    },
    "stringsBowBehindBridgeOneString": {
        "codepoint": "U+E627",
        "description": "Bow behind bridge on one string"
    },
    "stringsBowBehindBridgeThreeStrings": {
        "codepoint": "U+E629",
        "description": "Bow behind bridge on three strings"
    },
    "stringsBowBehindBridgeTwoStrings": {
        "codepoint": "U+E628",
        "description": "Bow behind bridge on two strings"
    },
    "stringsBowOnBridge": {
        "codepoint": "U+E619",
        "description": "Bow on top of bridge"
    },
    "stringsBowOnTailpiece": {
        "codepoint": "U+E61A",
        "description": "Bow on tailpiece"
    },
    "stringsChangeBowDirection": {
        "codepoint": "U+E626",
        "description": "Change bow direction, indeterminate"
    },
    "stringsDownBow": {
        "alternateCodepoint": "U+1D1AA",
        "codepoint": "U+E610",
        "description": "Down bow"
    },
    "stringsDownBowTurned": {
        "codepoint": "U+E611",
        "description": "Turned down bow"
    },
    "stringsFouette": {
        "codepoint": "U+E622",
        "description": "Fouett\u00e9"
    },
    "stringsHalfHarmonic": {
        "codepoint": "U+E615",
        "description": "Half-harmonic"
    },
    "stringsHarmonic": {
        "alternateCodepoint": "U+1D1AC",
        "codepoint": "U+E614",
        "description": "Harmonic"
    },
    "stringsJeteAbove": {
        "codepoint": "U+E620",
        "description": "Jet\u00e9 (gettato) above"
    },
    "stringsJeteBelow": {
        "codepoint": "U+E621",
        "description": "Jet\u00e9 (gettato) below"
    },
    "stringsMuteOff": {
        "codepoint": "U+E617",
        "description": "Mute off"
    },
    "stringsMuteOn": {
        "codepoint": "U+E616",
        "description": "Mute on"
    },
    "stringsOverpressureDownBow": {
        "codepoint": "U+E61B",
        "description": "Overpressure, down bow"
    },
    "stringsOverpressureNoDirection": {
        "codepoint": "U+E61F",
        "description": "Overpressure, no bow direction"
    },
    "stringsOverpressurePossibileDownBow": {
        "codepoint": "U+E61D",
        "description": "Overpressure possibile, down bow"
    },
    "stringsOverpressurePossibileUpBow": {
        "codepoint": "U+E61E",
        "description": "Overpressure possibile, up bow"
    },
    "stringsOverpressureUpBow": {
        "codepoint": "U+E61C",
        "description": "Overpressure, up bow"
    },
    "stringsThumbPosition": {
        "codepoint": "U+E624",
        "description": "Thumb position"
    },
    "stringsThumbPositionTurned": {
        "codepoint": "U+E625",
        "description": "Turned thumb position"
    },
    "stringsUpBow": {
        "alternateCodepoint": "U+1D1AB",
        "codepoint": "U+E612",
        "description": "Up bow"
    },
    "stringsUpBowTurned": {
        "codepoint": "U+E613",
        "description": "Turned up bow"
    },
    "stringsVibratoPulse": {
        "codepoint": "U+E623",
        "description": "Vibrato pulse accent (Saunders) for stem"
    },
    "systemDivider": {
        "codepoint": "U+E007",
        "description": "System divider"
    },
    "systemDividerExtraLong": {
        "codepoint": "U+E009",
        "description": "Extra long system divider"
    },
    "systemDividerLong": {
        "codepoint": "U+E008",
        "description": "Long system divider"
    },
    "textAugmentationDot": {
        "codepoint": "U+E1FC",
        "description": "Augmentation dot"
    },
    "textBlackNoteFrac16thLongStem": {
        "codepoint": "U+E1F5",
        "description": "Black note, fractional 16th beam, long stem"
    },
    "textBlackNoteFrac16thShortStem": {
        "codepoint": "U+E1F4",
        "description": "Black note, fractional 16th beam, short stem"
    },
    "textBlackNoteFrac32ndLongStem": {
        "codepoint": "U+E1F6",
        "description": "Black note, fractional 32nd beam, long stem"
    },
    "textBlackNoteFrac8thLongStem": {
        "codepoint": "U+E1F3",
        "description": "Black note, fractional 8th beam, long stem"
    },
    "textBlackNoteFrac8thShortStem": {
        "codepoint": "U+E1F2",
        "description": "Black note, fractional 8th beam, short stem"
    },
    "textBlackNoteLongStem": {
        "codepoint": "U+E1F1",
        "description": "Black note, long stem"
    },
    "textBlackNoteShortStem": {
        "codepoint": "U+E1F0",
        "description": "Black note, short stem"
    },
    "textCont16thBeamLongStem": {
        "codepoint": "U+E1FA",
        "description": "Continuing 16th beam for long stem"
    },
    "textCont16thBeamShortStem": {
        "codepoint": "U+E1F9",
        "description": "Continuing 16th beam for short stem"
    },
    "textCont32ndBeamLongStem": {
        "codepoint": "U+E1FB",
        "description": "Continuing 32nd beam for long stem"
    },
    "textCont8thBeamLongStem": {
        "codepoint": "U+E1F8",
        "description": "Continuing 8th beam for long stem"
    },
    "textCont8thBeamShortStem": {
        "codepoint": "U+E1F7",
        "description": "Continuing 8th beam for short stem"
    },
    "textTie": {
        "codepoint": "U+E1FD",
        "description": "Tie"
    },
    "textTuplet3LongStem": {
        "codepoint": "U+E202",
        "description": "Tuplet number 3 for long stem"
    },
    "textTuplet3ShortStem": {
        "codepoint": "U+E1FF",
        "description": "Tuplet number 3 for short stem"
    },
    "textTupletBracketEndLongStem": {
        "codepoint": "U+E203",
        "description": "Tuplet bracket end for long stem"
    },
    "textTupletBracketEndShortStem": {
        "codepoint": "U+E200",
        "description": "Tuplet bracket end for short stem"
    },
    "textTupletBracketStartLongStem": {
        "codepoint": "U+E201",
        "description": "Tuplet bracket start for long stem"
    },
    "textTupletBracketStartShortStem": {
        "codepoint": "U+E1FE",
        "description": "Tuplet bracket start for short stem"
    },
    "timeSig0": {
        "codepoint": "U+E080",
        "description": "Time signature 0"
    },
    "timeSig0Reversed": {
        "codepoint": "U+ECF0",
        "description": "Reversed time signature 0"
    },
    "timeSig0Turned": {
        "codepoint": "U+ECE0",
        "description": "Turned time signature 0"
    },
    "timeSig1": {
        "codepoint": "U+E081",
        "description": "Time signature 1"
    },
    "timeSig1Reversed": {
        "codepoint": "U+ECF1",
        "description": "Reversed time signature 1"
    },
    "timeSig1Turned": {
        "codepoint": "U+ECE1",
        "description": "Turned time signature 1"
    },
    "timeSig2": {
        "codepoint": "U+E082",
        "description": "Time signature 2"
    },
    "timeSig2Reversed": {
        "codepoint": "U+ECF2",
        "description": "Reversed time signature 2"
    },
    "timeSig2Turned": {
        "codepoint": "U+ECE2",
        "description": "Turned time signature 2"
    },
    "timeSig3": {
        "codepoint": "U+E083",
        "description": "Time signature 3"
    },
    "timeSig3Reversed": {
        "codepoint": "U+ECF3",
        "description": "Reversed time signature 3"
    },
    "timeSig3Turned": {
        "codepoint": "U+ECE3",
        "description": "Turned time signature 3"
    },
    "timeSig4": {
        "codepoint": "U+E084",
        "description": "Time signature 4"
    },
    "timeSig4Reversed": {
        "codepoint": "U+ECF4",
        "description": "Reversed time signature 4"
    },
    "timeSig4Turned": {
        "codepoint": "U+ECE4",
        "description": "Turned time signature 4"
    },
    "timeSig5": {
        "codepoint": "U+E085",
        "description": "Time signature 5"
    },
    "timeSig5Reversed": {
        "codepoint": "U+ECF5",
        "description": "Reversed time signature 5"
    },
    "timeSig5Turned": {
        "codepoint": "U+ECE5",
        "description": "Turned time signature 5"
    },
    "timeSig6": {
        "codepoint": "U+E086",
        "description": "Time signature 6"
    },
    "timeSig6Reversed": {
        "codepoint": "U+ECF6",
        "description": "Reversed time signature 6"
    },
    "timeSig6Turned": {
        "codepoint": "U+ECE6",
        "description": "Turned time signature 6"
    },
    "timeSig7": {
        "codepoint": "U+E087",
        "description": "Time signature 7"
    },
    "timeSig7Reversed": {
        "codepoint": "U+ECF7",
        "description": "Reversed time signature 7"
    },
    "timeSig7Turned": {
        "codepoint": "U+ECE7",
        "description": "Turned time signature 7"
    },
    "timeSig8": {
        "codepoint": "U+E088",
        "description": "Time signature 8"
    },
    "timeSig8Reversed": {
        "codepoint": "U+ECF8",
        "description": "Reversed time signature 8"
    },
    "timeSig8Turned": {
        "codepoint": "U+ECE8",
        "description": "Turned time signature 8"
    },
    "timeSig9": {
        "codepoint": "U+E089",
        "description": "Time signature 9"
    },
    "timeSig9Reversed": {
        "codepoint": "U+ECF9",
        "description": "Reversed time signature 9"
    },
    "timeSig9Turned": {
        "codepoint": "U+ECE9",
        "description": "Turned time signature 9"
    },
    "timeSigBracketLeft": {
        "codepoint": "U+EC80",
        "description": "Left bracket for whole time signature"
    },
    "timeSigBracketLeftSmall": {
        "codepoint": "U+EC82",
        "description": "Left bracket for numerator only"
    },
    "timeSigBracketRight": {
        "codepoint": "U+EC81",
        "description": "Right bracket for whole time signature"
    },
    "timeSigBracketRightSmall": {
        "codepoint": "U+EC83",
        "description": "Right bracket for numerator only"
    },
    "timeSigCombDenominator": {
        "codepoint": "U+E09F",
        "description": "Control character for denominator digit"
    },
    "timeSigCombNumerator": {
        "codepoint": "U+E09E",
        "description": "Control character for numerator digit"
    },
    "timeSigComma": {
        "codepoint": "U+E096",
        "description": "Time signature comma"
    },
    "timeSigCommon": {
        "alternateCodepoint": "U+1D134",
        "codepoint": "U+E08A",
        "description": "Common time"
    },
    "timeSigCommonReversed": {
        "codepoint": "U+ECFA",
        "description": "Reversed common time"
    },
    "timeSigCommonTurned": {
        "codepoint": "U+ECEA",
        "description": "Turned common time"
    },
    "timeSigCut2": {
        "codepoint": "U+EC85",
        "description": "Cut time (Bach)"
    },
    "timeSigCut3": {
        "codepoint": "U+EC86",
        "description": "Cut triple time (9/8)"
    },
    "timeSigCutCommon": {
        "alternateCodepoint": "U+1D135",
        "codepoint": "U+E08B",
        "description": "Cut time"
    },
    "timeSigCutCommonReversed": {
        "codepoint": "U+ECFB",
        "description": "Reversed cut time"
    },
    "timeSigCutCommonTurned": {
        "codepoint": "U+ECEB",
        "description": "Turned cut time"
    },
    "timeSigEquals": {
        "codepoint": "U+E08F",
        "description": "Time signature equals"
    },
    "timeSigFractionHalf": {
        "codepoint": "U+E098",
        "description": "Time signature fraction \u00bd"
    },
    "timeSigFractionOneThird": {
        "codepoint": "U+E09A",
        "description": "Time signature fraction \u2153"
    },
    "timeSigFractionQuarter": {
        "codepoint": "U+E097",
        "description": "Time signature fraction \u00bc"
    },
    "timeSigFractionThreeQuarters": {
        "codepoint": "U+E099",
        "description": "Time signature fraction \u00be"
    },
    "timeSigFractionTwoThirds": {
        "codepoint": "U+E09B",
        "description": "Time signature fraction \u2154"
    },
    "timeSigFractionalSlash": {
        "codepoint": "U+E08E",
        "description": "Time signature fraction slash"
    },
    "timeSigMinus": {
        "codepoint": "U+E090",
        "description": "Time signature minus"
    },
    "timeSigMultiply": {
        "codepoint": "U+E091",
        "description": "Time signature multiply"
    },
    "timeSigOpenPenderecki": {
        "codepoint": "U+E09D",
        "description": "Open time signature (Penderecki)"
    },
    "timeSigParensLeft": {
        "codepoint": "U+E094",
        "description": "Left parenthesis for whole time signature"
    },
    "timeSigParensLeftSmall": {
        "codepoint": "U+E092",
        "description": "Left parenthesis for numerator only"
    },
    "timeSigParensRight": {
        "codepoint": "U+E095",
        "description": "Right parenthesis for whole time signature"
    },
    "timeSigParensRightSmall": {
        "codepoint": "U+E093",
        "description": "Right parenthesis for numerator only"
    },
    "timeSigPlus": {
        "codepoint": "U+E08C",
        "description": "Time signature +"
    },
    "timeSigPlusSmall": {
        "codepoint": "U+E08D",
        "description": "Time signature + (for numerators)"
    },
    "timeSigSlash": {
        "codepoint": "U+EC84",
        "description": "Time signature slash separator"
    },
    "timeSigX": {
        "codepoint": "U+E09C",
        "description": "Open time signature"
    },
    "tremolo1": {
        "alternateCodepoint": "U+1D167",
        "codepoint": "U+E220",
        "description": "Combining tremolo 1"
    },
    "tremolo2": {
        "alternateCodepoint": "U+1D168",
        "codepoint": "U+E221",
        "description": "Combining tremolo 2"
    },
    "tremolo3": {
        "alternateCodepoint": "U+1D169",
        "codepoint": "U+E222",
        "description": "Combining tremolo 3"
    },
    "tremolo4": {
        "codepoint": "U+E223",
        "description": "Combining tremolo 4"
    },
    "tremolo5": {
        "codepoint": "U+E224",
        "description": "Combining tremolo 5"
    },
    "tremoloDivisiDots2": {
        "codepoint": "U+E22E",
        "description": "Divide measured tremolo by 2"
    },
    "tremoloDivisiDots3": {
        "codepoint": "U+E22F",
        "description": "Divide measured tremolo by 3"
    },
    "tremoloDivisiDots4": {
        "codepoint": "U+E230",
        "description": "Divide measured tremolo by 4"
    },
    "tremoloDivisiDots6": {
        "codepoint": "U+E231",
        "description": "Divide measured tremolo by 6"
    },
    "tremoloFingered1": {
        "alternateCodepoint": "U+1D16A",
        "codepoint": "U+E225",
        "description": "Fingered tremolo 1"
    },
    "tremoloFingered2": {
        "alternateCodepoint": "U+1D16B",
        "codepoint": "U+E226",
        "description": "Fingered tremolo 2"
    },
    "tremoloFingered3": {
        "alternateCodepoint": "U+1D16C",
        "codepoint": "U+E227",
        "description": "Fingered tremolo 3"
    },
    "tremoloFingered4": {
        "codepoint": "U+E228",
        "description": "Fingered tremolo 4"
    },
    "tremoloFingered5": {
        "codepoint": "U+E229",
        "description": "Fingered tremolo 5"
    },
    "tripleTongueAbove": {
        "alternateCodepoint": "U+1D18B",
        "codepoint": "U+E5F2",
        "description": "Triple-tongue above"
    },
    "tripleTongueBelow": {
        "codepoint": "U+E5F3",
        "description": "Triple-tongue below"
    },
    "tuplet0": {
        "codepoint": "U+E880",
        "description": "Tuplet 0"
    },
    "tuplet1": {
        "codepoint": "U+E881",
        "description": "Tuplet 1"
    },
    "tuplet2": {
        "codepoint": "U+E882",
        "description": "Tuplet 2"
    },
    "tuplet3": {
        "codepoint": "U+E883",
        "description": "Tuplet 3"
    },
    "tuplet4": {
        "codepoint": "U+E884",
        "description": "Tuplet 4"
    },
    "tuplet5": {
        "codepoint": "U+E885",
        "description": "Tuplet 5"
    },
    "tuplet6": {
        "codepoint": "U+E886",
        "description": "Tuplet 6"
    },
    "tuplet7": {
        "codepoint": "U+E887",
        "description": "Tuplet 7"
    },
    "tuplet8": {
        "codepoint": "U+E888",
        "description": "Tuplet 8"
    },
    "tuplet9": {
        "codepoint": "U+E889",
        "description": "Tuplet 9"
    },
    "tupletColon": {
        "codepoint": "U+E88A",
        "description": "Tuplet colon"
    },
    "unmeasuredTremolo": {
        "codepoint": "U+E22C",
        "description": "Wieniawski unmeasured tremolo"
    },
    "unmeasuredTremoloSimple": {
        "codepoint": "U+E22D",
        "description": "Wieniawski unmeasured tremolo (simpler)"
    },
    "unpitchedPercussionClef1": {
        "alternateCodepoint": "U+1D125",
        "codepoint": "U+E069",
        "description": "Unpitched percussion clef 1"
    },
    "unpitchedPercussionClef2": {
        "alternateCodepoint": "U+1D126",
        "codepoint": "U+E06A",
        "description": "Unpitched percussion clef 2"
    },
    "ventiduesima": {
        "codepoint": "U+E517",
        "description": "Ventiduesima"
    },
    "ventiduesimaAlta": {
        "codepoint": "U+E518",
        "description": "Ventiduesima alta"
    },
    "ventiduesimaBassa": {
        "codepoint": "U+E519",
        "description": "Ventiduesima bassa"
    },
    "ventiduesimaBassaMb": {
        "codepoint": "U+E51E",
        "description": "Ventiduesima bassa (mb)"
    },
    "vocalFingerClickStockhausen": {
        "codepoint": "U+E649",
        "description": "Finger click (Stockhausen)"
    },
    "vocalHalbGesungen": {
        "codepoint": "U+E64B",
        "description": "Halb gesungen (semi-sprechgesang)"
    },
    "vocalMouthClosed": {
        "codepoint": "U+E640",
        "description": "Mouth closed"
    },
    "vocalMouthOpen": {
        "codepoint": "U+E642",
        "description": "Mouth open"
    },
    "vocalMouthPursed": {
        "codepoint": "U+E644",
        "description": "Mouth pursed"
    },
    "vocalMouthSlightlyOpen": {
        "codepoint": "U+E641",
        "description": "Mouth slightly open"
    },
    "vocalMouthWideOpen": {
        "codepoint": "U+E643",
        "description": "Mouth wide open"
    },
    "vocalNasalVoice": {
        "codepoint": "U+E647",
        "description": "Nasal voice"
    },
    "vocalSprechgesang": {
        "codepoint": "U+E645",
        "description": "Sprechgesang"
    },
    "vocalTongueClickStockhausen": {
        "codepoint": "U+E648",
        "description": "Tongue click (Stockhausen)"
    },
    "vocalTongueFingerClickStockhausen": {
        "codepoint": "U+E64A",
        "description": "Tongue and finger click (Stockhausen)"
    },
    "vocalsSussurando": {
        "codepoint": "U+E646",
        "description": "Combining sussurando for stem"
    },
    "wiggleArpeggiatoDown": {
        "codepoint": "U+EAAA",
        "description": "Arpeggiato wiggle segment, downwards"
    },
    "wiggleArpeggiatoDownArrow": {
        "codepoint": "U+EAAE",
        "description": "Arpeggiato arrowhead down"
    },
    "wiggleArpeggiatoDownSwash": {
        "codepoint": "U+EAAC",
        "description": "Arpeggiato downward swash"
    },
    "wiggleArpeggiatoUp": {
        "codepoint": "U+EAA9",
        "description": "Arpeggiato wiggle segment, upwards"
    },
    "wiggleArpeggiatoUpArrow": {
        "codepoint": "U+EAAD",
        "description": "Arpeggiato arrowhead up"
    },
    "wiggleArpeggiatoUpSwash": {
        "codepoint": "U+EAAB",
        "description": "Arpeggiato upward swash"
    },
    "wiggleCircular": {
        "codepoint": "U+EAC9",
        "description": "Circular motion segment"
    },
    "wiggleCircularConstant": {
        "codepoint": "U+EAC0",
        "description": "Constant circular motion segment"
    },
    "wiggleCircularConstantFlipped": {
        "codepoint": "U+EAC1",
        "description": "Constant circular motion segment (flipped)"
    },
    "wiggleCircularConstantFlippedLarge": {
        "codepoint": "U+EAC3",
        "description": "Constant circular motion segment (flipped, large)"
    },
    "wiggleCircularConstantLarge": {
        "codepoint": "U+EAC2",
        "description": "Constant circular motion segment (large)"
    },
    "wiggleCircularEnd": {
        "codepoint": "U+EACB",
        "description": "Circular motion end"
    },
    "wiggleCircularLarge": {
        "codepoint": "U+EAC8",
        "description": "Circular motion segment, large"
    },
    "wiggleCircularLarger": {
        "codepoint": "U+EAC7",
        "description": "Circular motion segment, larger"
    },
    "wiggleCircularLargerStill": {
        "codepoint": "U+EAC6",
        "description": "Circular motion segment, larger still"
    },
    "wiggleCircularLargest": {
        "codepoint": "U+EAC5",
        "description": "Circular motion segment, largest"
    },
    "wiggleCircularSmall": {
        "codepoint": "U+EACA",
        "description": "Circular motion segment, small"
    },
    "wiggleCircularStart": {
        "codepoint": "U+EAC4",
        "description": "Circular motion start"
    },
    "wiggleGlissando": {
        "codepoint": "U+EAAF",
        "description": "Glissando wiggle segment"
    },
    "wiggleGlissandoGroup1": {
        "codepoint": "U+EABD",
        "description": "Group glissando 1"
    },
    "wiggleGlissandoGroup2": {
        "codepoint": "U+EABE",
        "description": "Group glissando 2"
    },
    "wiggleGlissandoGroup3": {
        "codepoint": "U+EABF",
        "description": "Group glissando 3"
    },
    "wiggleRandom1": {
        "codepoint": "U+EAF0",
        "description": "Quasi-random squiggle 1"
    },
    "wiggleRandom2": {
        "codepoint": "U+EAF1",
        "description": "Quasi-random squiggle 2"
    },
    "wiggleRandom3": {
        "codepoint": "U+EAF2",
        "description": "Quasi-random squiggle 3"
    },
    "wiggleRandom4": {
        "codepoint": "U+EAF3",
        "description": "Quasi-random squiggle 4"
    },
    "wiggleSawtooth": {
        "codepoint": "U+EABB",
        "description": "Sawtooth line segment"
    },
    "wiggleSawtoothNarrow": {
        "codepoint": "U+EABA",
        "description": "Narrow sawtooth line segment"
    },
    "wiggleSawtoothWide": {
        "codepoint": "U+EABC",
        "description": "Wide sawtooth line segment"
    },
    "wiggleSquareWave": {
        "codepoint": "U+EAB8",
        "description": "Square wave line segment"
    },
    "wiggleSquareWaveNarrow": {
        "codepoint": "U+EAB7",
        "description": "Narrow square wave line segment"
    },
    "wiggleSquareWaveWide": {
        "codepoint": "U+EAB9",
        "description": "Wide square wave line segment"
    },
    "wiggleTrill": {
        "codepoint": "U+EAA4",
        "description": "Trill wiggle segment"
    },
    "wiggleTrillFast": {
        "codepoint": "U+EAA3",
        "description": "Trill wiggle segment, fast"
    },
    "wiggleTrillFaster": {
        "codepoint": "U+EAA2",
        "description": "Trill wiggle segment, faster"
    },
    "wiggleTrillFasterStill": {
        "codepoint": "U+EAA1",
        "description": "Trill wiggle segment, faster still"
    },
    "wiggleTrillFastest": {
        "codepoint": "U+EAA0",
        "description": "Trill wiggle segment, fastest"
    },
    "wiggleTrillSlow": {
        "codepoint": "U+EAA5",
        "description": "Trill wiggle segment, slow"
    },
    "wiggleTrillSlower": {
        "codepoint": "U+EAA6",
        "description": "Trill wiggle segment, slower"
    },
    "wiggleTrillSlowerStill": {
        "codepoint": "U+EAA7",
        "description": "Trill wiggle segment, slower still"
    },
    "wiggleTrillSlowest": {
        "codepoint": "U+EAA8",
        "description": "Trill wiggle segment, slowest"
    },
    "wiggleVIbratoLargestSlower": {
        "codepoint": "U+EAEE",
        "description": "Vibrato largest, slower"
    },
    "wiggleVIbratoMediumSlower": {
        "codepoint": "U+EAE0",
        "description": "Vibrato medium, slower"
    },
    "wiggleVibrato": {
        "codepoint": "U+EAB0",
        "description": "Vibrato / shake wiggle segment"
    },
    "wiggleVibratoLargeFast": {
        "codepoint": "U+EAE5",
        "description": "Vibrato large, fast"
    },
    "wiggleVibratoLargeFaster": {
        "codepoint": "U+EAE4",
        "description": "Vibrato large, faster"
    },
    "wiggleVibratoLargeFasterStill": {
        "codepoint": "U+EAE3",
        "description": "Vibrato large, faster still"
    },
    "wiggleVibratoLargeFastest": {
        "codepoint": "U+EAE2",
        "description": "Vibrato large, fastest"
    },
    "wiggleVibratoLargeSlow": {
        "codepoint": "U+EAE6",
        "description": "Vibrato large, slow"
    },
    "wiggleVibratoLargeSlower": {
        "codepoint": "U+EAE7",
        "description": "Vibrato large, slower"
    },
    "wiggleVibratoLargeSlowest": {
        "codepoint": "U+EAE8",
        "description": "Vibrato large, slowest"
    },
    "wiggleVibratoLargestFast": {
        "codepoint": "U+EAEC",
        "description": "Vibrato largest, fast"
    },
    "wiggleVibratoLargestFaster": {
        "codepoint": "U+EAEB",
        "description": "Vibrato largest, faster"
    },
    "wiggleVibratoLargestFasterStill": {
        "codepoint": "U+EAEA",
        "description": "Vibrato largest, faster still"
    },
    "wiggleVibratoLargestFastest": {
        "codepoint": "U+EAE9",
        "description": "Vibrato largest, fastest"
    },
    "wiggleVibratoLargestSlow": {
        "codepoint": "U+EAED",
        "description": "Vibrato largest, slow"
    },
    "wiggleVibratoLargestSlowest": {
        "codepoint": "U+EAEF",
        "description": "Vibrato largest, slowest"
    },
    "wiggleVibratoMediumFast": {
        "codepoint": "U+EADE",
        "description": "Vibrato medium, fast"
    },
    "wiggleVibratoMediumFaster": {
        "codepoint": "U+EADD",
        "description": "Vibrato medium, faster"
    },
    "wiggleVibratoMediumFasterStill": {
        "codepoint": "U+EADC",
        "description": "Vibrato medium, faster still"
    },
    "wiggleVibratoMediumFastest": {
        "codepoint": "U+EADB",
        "description": "Vibrato medium, fastest"
    },
    "wiggleVibratoMediumSlow": {
        "codepoint": "U+EADF",
        "description": "Vibrato medium, slow"
    },
    "wiggleVibratoMediumSlowest": {
        "codepoint": "U+EAE1",
        "description": "Vibrato medium, slowest"
    },
    "wiggleVibratoSmallFast": {
        "codepoint": "U+EAD7",
        "description": "Vibrato small, fast"
    },
    "wiggleVibratoSmallFaster": {
        "codepoint": "U+EAD6",
        "description": "Vibrato small, faster"
    },
    "wiggleVibratoSmallFasterStill": {
        "codepoint": "U+EAD5",
        "description": "Vibrato small, faster still"
    },
    "wiggleVibratoSmallFastest": {
        "codepoint": "U+EAD4",
        "description": "Vibrato small, fastest"
    },
    "wiggleVibratoSmallSlow": {
        "codepoint": "U+EAD8",
        "description": "Vibrato small, slow"
    },
    "wiggleVibratoSmallSlower": {
        "codepoint": "U+EAD9",
        "description": "Vibrato small, slower"
    },
    "wiggleVibratoSmallSlowest": {
        "codepoint": "U+EADA",
        "description": "Vibrato small, slowest"
    },
    "wiggleVibratoSmallestFast": {
        "codepoint": "U+EAD0",
        "description": "Vibrato smallest, fast"
    },
    "wiggleVibratoSmallestFaster": {
        "codepoint": "U+EACF",
        "description": "Vibrato smallest, faster"
    },
    "wiggleVibratoSmallestFasterStill": {
        "codepoint": "U+EACE",
        "description": "Vibrato smallest, faster still"
    },
    "wiggleVibratoSmallestFastest": {
        "codepoint": "U+EACD",
        "description": "Vibrato smallest, fastest"
    },
    "wiggleVibratoSmallestSlow": {
        "codepoint": "U+EAD1",
        "description": "Vibrato smallest, slow"
    },
    "wiggleVibratoSmallestSlower": {
        "codepoint": "U+EAD2",
        "description": "Vibrato smallest, slower"
    },
    "wiggleVibratoSmallestSlowest": {
        "codepoint": "U+EAD3",
        "description": "Vibrato smallest, slowest"
    },
    "wiggleVibratoStart": {
        "codepoint": "U+EACC",
        "description": "Vibrato start"
    },
    "wiggleVibratoWide": {
        "codepoint": "U+EAB1",
        "description": "Wide vibrato / shake wiggle segment"
    },
    "wiggleWavy": {
        "codepoint": "U+EAB5",
        "description": "Wavy line segment"
    },
    "wiggleWavyNarrow": {
        "codepoint": "U+EAB4",
        "description": "Narrow wavy line segment"
    },
    "wiggleWavyWide": {
        "codepoint": "U+EAB6",
        "description": "Wide wavy line segment"
    },
    "windClosedHole": {
        "codepoint": "U+E5F4",
        "description": "Closed hole"
    },
    "windFlatEmbouchure": {
        "codepoint": "U+E5FB",
        "description": "Flatter embouchure"
    },
    "windHalfClosedHole1": {
        "codepoint": "U+E5F6",
        "description": "Half-closed hole"
    },
    "windHalfClosedHole2": {
        "codepoint": "U+E5F7",
        "description": "Half-closed hole 2"
    },
    "windHalfClosedHole3": {
        "codepoint": "U+E5F8",
        "description": "Half-open hole"
    },
    "windLessRelaxedEmbouchure": {
        "codepoint": "U+E5FE",
        "description": "Somewhat relaxed embouchure"
    },
    "windLessTightEmbouchure": {
        "codepoint": "U+E600",
        "description": "Somewhat tight embouchure"
    },
    "windMouthpiecePop": {
        "codepoint": "U+E60A",
        "description": "Mouthpiece or hand pop"
    },
    "windMultiphonicsBlackStem": {
        "codepoint": "U+E607",
        "description": "Combining multiphonics (black) for stem"
    },
    "windMultiphonicsBlackWhiteStem": {
        "codepoint": "U+E609",
        "description": "Combining multiphonics (black and white) for stem"
    },
    "windMultiphonicsWhiteStem": {
        "codepoint": "U+E608",
        "description": "Combining multiphonics (white) for stem"
    },
    "windOpenHole": {
        "codepoint": "U+E5F9",
        "description": "Open hole"
    },
    "windReedPositionIn": {
        "codepoint": "U+E606",
        "description": "Much more reed (push inwards)"
    },
    "windReedPositionNormal": {
        "codepoint": "U+E604",
        "description": "Normal reed position"
    },
    "windReedPositionOut": {
        "codepoint": "U+E605",
        "description": "Very little reed (pull outwards)"
    },
    "windRelaxedEmbouchure": {
        "codepoint": "U+E5FD",
        "description": "Relaxed embouchure"
    },
    "windRimOnly": {
        "codepoint": "U+E60B",
        "description": "Rim only"
    },
    "windSharpEmbouchure": {
        "codepoint": "U+E5FC",
        "description": "Sharper embouchure"
    },
    "windStrongAirPressure": {
        "codepoint": "U+E603",
        "description": "Very tight embouchure / strong air pressure"
    },
    "windThreeQuartersClosedHole": {
        "codepoint": "U+E5F5",
        "description": "Three-quarters closed hole"
    },
    "windTightEmbouchure": {
        "codepoint": "U+E5FF",
        "description": "Tight embouchure"
    },
    "windTrillKey": {
        "codepoint": "U+E5FA",
        "description": "Trill key"
    },
    "windVeryTightEmbouchure": {
        "codepoint": "U+E601",
        "description": "Very tight embouchure"
    },
    "windWeakAirPressure": {
        "codepoint": "U+E602",
        "description": "Very relaxed embouchure / weak air-pressure"
    }
};
exports.default = glyphNames;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2x5cGhuYW1lcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9TY2hlbWEvU011RkwvZ2x5cGhuYW1lcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE1BQU0sVUFBVSxHQUFHO0lBQ2YsZ0JBQWdCLEVBQUU7UUFDZCxXQUFXLEVBQUUsUUFBUTtRQUNyQixhQUFhLEVBQUUsbUJBQW1CO0tBQ3JDO0lBQ0QsZ0JBQWdCLEVBQUU7UUFDZCxXQUFXLEVBQUUsUUFBUTtRQUNyQixhQUFhLEVBQUUsbUJBQW1CO0tBQ3JDO0lBQ0QsOEJBQThCLEVBQUU7UUFDNUIsV0FBVyxFQUFFLFFBQVE7UUFDckIsYUFBYSxFQUFFLDZDQUE2QztLQUMvRDtJQUNELDRCQUE0QixFQUFFO1FBQzFCLFdBQVcsRUFBRSxRQUFRO1FBQ3JCLGFBQWEsRUFBRSxrRUFBa0U7S0FDcEY7SUFDRCwrQkFBK0IsRUFBRTtRQUM3QixXQUFXLEVBQUUsUUFBUTtRQUNyQixhQUFhLEVBQUUscUVBQXFFO0tBQ3ZGO0lBQ0QsNkJBQTZCLEVBQUU7UUFDM0IsV0FBVyxFQUFFLFFBQVE7UUFDckIsYUFBYSxFQUFFLHNFQUFzRTtLQUN4RjtJQUNELGlDQUFpQyxFQUFFO1FBQy9CLFdBQVcsRUFBRSxRQUFRO1FBQ3JCLGFBQWEsRUFBRSx5QkFBeUI7S0FDM0M7SUFDRCwrQkFBK0IsRUFBRTtRQUM3QixXQUFXLEVBQUUsUUFBUTtRQUNyQixhQUFhLEVBQUUsc0RBQXNEO0tBQ3hFO0lBQ0Qsa0NBQWtDLEVBQUU7UUFDaEMsV0FBVyxFQUFFLFFBQVE7UUFDckIsYUFBYSxFQUFFLDBCQUEwQjtLQUM1QztJQUNELGdDQUFnQyxFQUFFO1FBQzlCLFdBQVcsRUFBRSxRQUFRO1FBQ3JCLGFBQWEsRUFBRSxnREFBZ0Q7S0FDbEU7SUFDRCwyQkFBMkIsRUFBRTtRQUN6QixXQUFXLEVBQUUsUUFBUTtRQUNyQixhQUFhLEVBQUUsa0JBQWtCO0tBQ3BDO0lBQ0QseUJBQXlCLEVB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QUNyQixhQUFhLEVBQUUseUJBQXlCO0tBQzNDO0lBQ0QsZ0JBQWdCLEVBQUU7UUFDZCxXQUFXLEVBQUUsUUFBUTtRQUNyQixhQUFhLEVBQUUseUJBQXlCO0tBQzNDO0lBQ0QsZ0JBQWdCLEVBQUU7UUFDZCxXQUFXLEVBQUUsUUFBUTtRQUNyQixhQUFhLEVBQUUseUJBQXlCO0tBQzNDO0lBQ0QsZ0JBQWdCLEVBQUU7UUFDZCxXQUFXLEVBQUUsUUFBUTtRQUNyQixhQUFhLEVBQUUseUJBQXlCO0tBQzNDO0lBQ0QsZ0JBQWdCLEVBQUU7UUFDZCxXQUFXLEVBQUUsUUFBUTtRQUNyQixhQUFhLEVBQUUseUJBQXlCO0tBQzNDO0lBQ0QsZ0JBQWdCLEVBQUU7UUFDZCxXQUFXLEVBQUUsUUFBUTtRQUNyQixhQUFhLEVBQUUseUJBQXlCO0tBQzNDO0lBQ0QsZ0JBQWdCLEVBQUU7UUFDZCxXQUFXLEVBQUUsUUFBUTtRQUNyQixhQUFhLEVBQUUsd0JBQXdCO0tBQzFDO0lBQ0QsZ0JBQWdCLEVBQUU7UUFDZCxXQUFXLEVBQUUsUUFBUTtRQUNyQixhQUFhLEVBQUUseUJBQXlCO0tBQzNDO0lBQ0QsZ0JBQWdCLEVBQUU7UUFDZCxXQUFXLEVBQUUsUUFBUTtRQUNyQixhQUFhLEVBQUUseUJBQXlCO0tBQzNDO0lBQ0QsZ0JBQWdCLEVBQUU7UUFDZCxXQUFXLEVBQUUsUUFBUTtRQUNyQixhQUFhLEVBQUUseUJBQXlCO0tBQzNDO0lBQ0QsZ0JBQWdCLEVBQUU7UUFDZCxXQUFXLEVBQUUsUUFBUTtRQUNyQixhQUFhLEVBQUUseUJBQXlCO0tBQzNDO0lBQ0QsZ0JBQWdCLEVBQUU7UUFDZCxXQUFXLEVBQUUsUUFBUTtRQUNyQixhQUFhLEVBQUUseUJBQXlCO0tBQzNDO0lBQ0QsZ0JBQWdCLEVBQUU7UUFDZCxXQUFXLEVBQUUsUUFBUTtRQUNyQixhQUFhLEVBQUUseUJBQXlCO0tBQzNDO0lBQ0QsZ0JBQWdCLEVBQUU7UUFDZCxXQUFXLEVBQUUsUUFBUTtRQUNyQixhQUFhLEVBQUUseUJBQXlCO0tBQzNDO0lBQ0QsTUFBTSxFQUFF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