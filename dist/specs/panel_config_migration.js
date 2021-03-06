"use strict";

System.register(["../panel_config_migration"], function (_export, _context) {
  "use strict";

  var migratePanelConfig;
  return {
    setters: [function (_panel_config_migration) {
      migratePanelConfig = _panel_config_migration.migratePanelConfig;
    }],
    execute: function () {
      describe('when migrate from config with urls', function () {
        var panel;
        describe('given full panel configuration', function () {
          var panelConfig = {
            "cards": {
              "cardHSpacing": 2,
              "cardMinWidth": 5,
              "cardRound": null,
              "cardVSpacing": 2
            },
            "color": {
              "cardColor": "#b4ff00",
              "colorScale": "sqrt",
              "colorScheme": "interpolateGnYlRd",
              "defaultColor": "#757575",
              "exponent": 0.5,
              "mode": "opacity",
              "thresholds": []
            },
            "data": {
              "decimals": null,
              "unitFormat": "short"
            },
            "datasource": "TestData DB",
            "gridPos": {
              "h": 8,
              "w": 12,
              "x": 0,
              "y": 0
            },
            "highlightCards": true,
            "id": 4,
            "legend": {
              "show": false
            },
            "nullPointMode": "as empty",
            "seriesFilterIndex": -1,
            "targets": [{
              "aggregation": "Last",
              "csvWave": {
                "timeStep": 60,
                "valuesCSV": "0,0,2,2,1,1,3,3"
              },
              "decimals": 2,
              "displayAliasType": "Warning / Critical",
              "displayType": "Regular",
              "displayValueWithAlias": "Never",
              "refId": "A",
              "scenarioId": "predictable_csv_wave",
              "stringInput": "",
              "units": "none",
              "valueHandler": "Number Threshold"
            }],
            "timeFrom": null,
            "timeShift": null,
            "title": "Panel Title",
            "tooltip": {
              "show": true
            },
            "type": "flant-statusmap-panel",
            "urls": [{
              "base_url": "",
              "extraSeries": {
                "index": -1
              },
              "forcelowercase": true,
              "icon_fa": "external-link",
              "label": "",
              "tooltip": "",
              "useExtraSeries": false,
              "useseriesname": true
            }],
            "useMax": true,
            "usingUrl": true,
            "xAxis": {
              "labelFormat": "%a %m/%d",
              "show": true
            },
            "yAxis": {
              "maxWidth": -1,
              "minWidth": -1,
              "show": true
            },
            "yAxisSort": "metrics"
          };
          beforeEach(function () {
            panel = Object.assign({}, panelConfig);
            migratePanelConfig(panel);
          });
          it('should migrate usingUrls to tooltip.freezeOnClick', function () {
            expect(panel.usingUrl).toBeUndefined();
            expect(panel.tooltip).toHaveProperty("freezeOnClick", true);
            expect(panel.tooltip.freezeOnClick).toBeTruthy();
          });
          it('should have no urls', function () {
            expect(panel.urls).toBeUndefined();
          });
          it('should have empty items in tooltip', function () {
            expect(panel.tooltip).toHaveProperty("items", []);
            expect(panel.tooltip.items).toHaveLength(0);
          });
        });
        describe("given configuration with non-empty base_url", function () {
          describe("with variables", function () {
            var panelConfig = {
              "tooltip": {
                "show": true
              },
              "urls": [{
                "base_url": "https://google.com/$series_label$time",
                "extraSeries": {
                  "index": -1
                },
                "forcelowercase": true,
                "icon_fa": "external-link",
                "label": "google",
                "tooltip": "",
                "useExtraSeries": false,
                "useseriesname": true
              }, {
                "base_url": "example.com/$series_extra",
                "extraSeries": {
                  "format": "YYYY/MM/DD/HH_mm_ss",
                  "index": -1
                },
                "forcelowercase": true,
                "icon_fa": "external-link",
                "label": "DateLink",
                "useExtraSeries": true
              }]
            };
            beforeEach(function () {
              panel = Object.assign({}, panelConfig);
              migratePanelConfig(panel);
            });
            it("should have equal size of tooltip.items", function () {
              expect(panel.tooltip).toHaveProperty("items");
              expect(panel.tooltip.items).toHaveLength(panelConfig.urls.length);
            });
            it("should replace time variable with __url_time_range", function () {
              expect(panel.tooltip.items[0].urlTemplate).toContain("${__url_time_range}");
            });
            it("should replace series_label variable with __y_label", function () {
              expect(panel.tooltip.items[0].urlTemplate).toContain("${__y_label}");
            });
            it("should replace series_extra variable with __value_date", function () {
              expect(panel.tooltip.items[1].urlTemplate).toContain("${__value_date}");
            });
          });
        });
      });
    }
  };
});
//# sourceMappingURL=panel_config_migration.js.map
