angular.module('templates-app', ['configuration.tpl.html', 'home.tpl.html', 'person/person.tpl.html', 'person/personlist.tpl.html']);

angular.module("configuration.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("configuration.tpl.html",
    "<md-toolbar class=\"md-whiteframe-glow-z1 md-default-theme\">\n" +
    "    <div class=\"md-toolbar-tools\">\n" +
    "        <md-button class=\"md-icon-button\" aria-label=\"Menu\" ng-click=\"toggleLeft()\" hide-gt-md>\n" +
    "            <md-icon md-svg-icon=\"assets/img/menu.svg\"></md-icon>\n" +
    "        </md-button>\n" +
    "        <h2>\n" +
    "            <span>Home</span>\n" +
    "        </h2>\n" +
    "        <span flex></span>\n" +
    "\n" +
    "    </div>\n" +
    "</md-toolbar>\n" +
    "<md-content layout-padding>\n" +
    "    <form name=\"configForm\" id=\"configForm\" novalidate>\n" +
    "        <div layout=\"row\" layout-sm=\"column\">\n" +
    "            <md-input-container flex>\n" +
    "                <label>Backend Address</label>\n" +
    "                <input ng-model=\"configurationCtrl.configuration.backendAddress\">\n" +
    "            </md-input-container>\n" +
    "        </div>\n" +
    "        <section layout=\"row\" layout-sm=\"row\" layout-align=\"end center\">\n" +
    "            <md-button type=\"submit\" class=\"md-primary\" ng-click=\"configurationCtrl.saveBackendAddress()\">Speichern\n" +
    "            </md-button>\n" +
    "        </section>\n" +
    "    </form>\n" +
    "</md-content>");
}]);

angular.module("home.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("home.tpl.html",
    "<md-toolbar class=\"md-whiteframe-glow-z1 md-default-theme\">\n" +
    "    <div class=\"md-toolbar-tools\">\n" +
    "        <md-button class=\"md-icon-button\" aria-label=\"Menu\" ng-click=\"toggleLeft()\" hide-gt-md>\n" +
    "            <md-icon md-svg-icon=\"assets/img/menu.svg\"></md-icon>\n" +
    "        </md-button>\n" +
    "        <h2>\n" +
    "            <span>Home</span>\n" +
    "        </h2>\n" +
    "        <span flex></span>\n" +
    "\n" +
    "    </div>\n" +
    "</md-toolbar>\n" +
    "<md-content>\n" +
    "    <div layout-padding>\n" +
    "        <h1 style=\"margin-left: 10px\">Hello, welcome!</h1>\n" +
    "    </div>\n" +
    "</md-content>");
}]);

angular.module("person/person.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("person/person.tpl.html",
    "<md-toolbar class=\"md-whiteframe-glow-z1 md-default-theme\">\n" +
    "    <div class=\"md-toolbar-tools\">\n" +
    "        <md-button class=\"md-icon-button\" aria-label=\"Menu\" ng-click=\"toggleLeft()\" hide-gt-md>\n" +
    "            <md-icon md-svg-icon=\"assets/img/menu.svg\"></md-icon>\n" +
    "        </md-button>\n" +
    "        <h2>\n" +
    "            <span>Personen</span>\n" +
    "        </h2>\n" +
    "        <span flex></span>\n" +
    "\n" +
    "    </div>\n" +
    "</md-toolbar>\n" +
    "\n" +
    "<md-content layout-padding>\n" +
    "    <form name=\"personForm\" id=\"personForm\" novalidate>\n" +
    "        <div layout=\"row\" layout-sm=\"column\">\n" +
    "            <md-input-container flex=\"40\" flex-sm=\"100\">\n" +
    "                <label>Vorname</label>\n" +
    "                <input ng-model=\"person.firstname\">\n" +
    "            </md-input-container>\n" +
    "            <md-input-container flex>\n" +
    "                <label>Name</label>\n" +
    "                <input name=\"lastname\" ng-model=\"person.lastname\" required>\n" +
    "\n" +
    "                <div ng-messages=\"personForm.lastname.$error\">\n" +
    "                    <div ng-message=\"required\" ng-if=\"personForm.lastname.$error.required\">Dies ist ein Pflichtfeld.\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </md-input-container>\n" +
    "        </div>\n" +
    "        <md-input-container>\n" +
    "            <label>E-Mail</label>\n" +
    "            <input name=\"email\" ng-model=\"person.email\" type=\"email\" required=\"true\">\n" +
    "\n" +
    "            <div ng-messages=\"personForm.email.$error\">\n" +
    "                <div>\n" +
    "                    <span ng-message=\"required\"\n" +
    "                          ng-if=\"personForm.email.$error.required\">Dies ist ein Pflichtfeld.</span>\n" +
    "                    <span ng-message=\"email\" ng-if=\"personForm.email.$error.email\">Bitte geben Sie eine gültige E-Mail-Adresse ein.</span>\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "        </md-input-container>\n" +
    "        <md-input-container>\n" +
    "            <label>Adresse</label>\n" +
    "            <input ng-model=\"person.street\">\n" +
    "        </md-input-container>\n" +
    "        <div layout=\"row\" layout-sm=\"column\">\n" +
    "            <md-input-container flex=\"40\" flex-sm=\"100\">\n" +
    "                <label>PLZ</label>\n" +
    "                <input ng-model=\"person.zip\">\n" +
    "            </md-input-container>\n" +
    "            <md-input-container flex>\n" +
    "                <label>Ort</label>\n" +
    "                <input name=\"place\" ng-model=\"person.place\" required>\n" +
    "\n" +
    "                <div ng-messages=\"personForm.place.$error\">\n" +
    "                    <div ng-message=\"required\" ng-if=\"personForm.place.$error.required\">Dies ist ein Pflichtfeld.</div>\n" +
    "                </div>\n" +
    "            </md-input-container>\n" +
    "        </div>\n" +
    "        <md-input-container flex>\n" +
    "            <label>Land</label>\n" +
    "            <input ng-model=\"person.country\">\n" +
    "        </md-input-container>\n" +
    "        <div layout=\"row\">\n" +
    "            <md-input-container>\n" +
    "                <md-checkbox class=\"md-primary\" ng-model=\"person.teacher\" aria-label=\"Teacher\" ng-change=\"processTeacherSelection()\">\n" +
    "                    Lehrer\n" +
    "                </md-checkbox>\n" +
    "            </md-input-container>\n" +
    "            <md-input-container>\n" +
    "                <md-checkbox class=\"md-primary\" ng-model=\"person.student\" aria-label=\"Student\">\n" +
    "                    Schüler\n" +
    "                </md-checkbox>\n" +
    "            </md-input-container>\n" +
    "        </div>\n" +
    "\n" +
    "        <div layout=\"row\" ng-if=\"person.teacher\" class=\"fade\">\n" +
    "            <label style=\"margin: 12px 20px 0px 10px\">Lehrer Qualifikationen</label>\n" +
    "            <div layout=\"column\">\n" +
    "                <div ng-repeat=\"qualification in teacherqualifications\">\n" +
    "                    <md-checkbox class=\"md-primary\" ng-model=\"selectedteacherqualification[qualification]\">\n" +
    "                        {{qualification}}\n" +
    "                    </md-checkbox>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <md-input-container flex>\n" +
    "            <label>Bemerkungen</label>\n" +
    "            <textarea ng-model=\"person.remarks\" columns=\"1\" md-maxlength=\"150\"></textarea>\n" +
    "        </md-input-container>\n" +
    "        <section layout=\"row\" layout-sm=\"row\" layout-align=\"end center\">\n" +
    "            <md-button type=\"button\" ng-href=\"#/personlist\" tabindex=\"-1\">Abbrechen</md-button>\n" +
    "            <md-button type=\"button\" ng-click=\"removePerson()\" ng-if=\"person._id\" tabindex=\"-1\">\n" +
    "                Löschen\n" +
    "            </md-button>\n" +
    "            <md-button type=\"submit\" class=\"md-primary\" ng-click=\"savePerson()\">Speichern\n" +
    "            </md-button>\n" +
    "        </section>\n" +
    "    </form>\n" +
    "</md-content>\n" +
    "\n" +
    "<div flex></div>");
}]);

angular.module("person/personlist.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("person/personlist.tpl.html",
    "<md-toolbar class=\"md-whiteframe-glow-z1 md-default-theme\">\n" +
    "    <div class=\"md-toolbar-tools\">\n" +
    "        <md-button class=\"md-icon-button\" aria-label=\"Menu\" ng-click=\"toggleLeft()\" hide-gt-md>\n" +
    "            <md-icon md-svg-icon=\"assets/img/menu.svg\"></md-icon>\n" +
    "        </md-button>\n" +
    "        <h2>\n" +
    "            <span>Personen</span>\n" +
    "        </h2>\n" +
    "        <span flex></span>\n" +
    "\n" +
    "    </div>\n" +
    "</md-toolbar>\n" +
    "\n" +
    "<md-content>\n" +
    "    <md-button href=\"#/personlist\">Refresh</md-button>\n" +
    "    <md-button href=\"#/person\">Person erfassen</md-button>\n" +
    "\n" +
    "    <md-list>\n" +
    "        <!--<md-subheader class=\"md-no-sticky\">Persons</md-subheader>-->\n" +
    "        <md-divider inset></md-divider>\n" +
    "        <md-list-item class=\"md-3-line\" ng-repeat=\"person in persons\"\n" +
    "                      ng-click=\"navigateTo(person)\">\n" +
    "            <img ng-src=\"assets/img/cat.jpeg\" class=\"md-avatar\" alt=\"{{person.email}}\"/>\n" +
    "\n" +
    "            <div class=\"md-list-item-text\" ng-class=\"{'realtimeentry': person.realtime}\">\n" +
    "                <h3>{{ person.firstname }} {{person.lastname}}</h3>\n" +
    "\n" +
    "                <h4>{{ person.street }}{{person.street ? ',': ''}} {{ person.zip }} {{ person.place }}</h4>\n" +
    "\n" +
    "                <p>{{ person.email }}</p>\n" +
    "            </div>\n" +
    "            <md-divider inset></md-divider>\n" +
    "        </md-list-item>\n" +
    "    </md-list>\n" +
    "\n" +
    "</md-content>\n" +
    "<div flex></div>");
}]);
