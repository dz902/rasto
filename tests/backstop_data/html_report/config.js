report({
  "testSuite": "BackstopJS",
  "tests": [
    {
      "pair": {
        "reference": "../bitmaps_reference/backstop_default_Basic_0_document_0_tablet.png",
        "test": "../bitmaps_test/20180205-222907/backstop_default_Basic_0_document_0_tablet.png",
        "selector": "document",
        "fileName": "backstop_default_Basic_0_document_0_tablet.png",
        "label": "Basic",
        "misMatchThreshold": 0.1,
        "diff": {
          "isSameDimensions": true,
          "dimensionDifference": {
            "width": 0,
            "height": 0
          },
          "misMatchPercentage": "0.19",
          "analysisTime": 145
        },
        "diffImage": "../bitmaps_test/20180205-222907/failed_diff_backstop_default_Basic_0_document_0_tablet.png"
      },
      "status": "fail"
    }
  ]
});