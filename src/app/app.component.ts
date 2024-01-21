import { Component } from '@angular/core';
import { RevealSdkSettings, RevealViewOptions, SavedEvent} from '@revealbi/ui';

//RevealSdkSettings.serverUrl = "https://samples.revealbi.io/upmedia-backend/reveal-api/";
RevealSdkSettings.serverUrl = "http://localhost:5111/";

declare let $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  MySavings(args: SavedEvent) {
    console.log("Initial isNew = " + args.isNew);

    if (args.saveAs) {
      console.log("Clicked Save As");
      console.log("dashboardId = " + args.dashboardId);
              console.log("name = " + args.name);
              console.log("isNew = " + args.isNew);
              console.log("saveAs = " + args.saveAs);

      var newName = prompt("Please enter the dashboard name");
      this.isDuplicateName(newName).then(isDuplicate => {
          if (isDuplicate === "true") {
              if (!window.confirm("A dashboard with name: " + newName + " already exists. Do you want to override it?")) {
                  return;
              }
          }
          args.dashboardId = args.name = newName;
          args.saveFinished();
      });
          }
          else {
              console.log("Clicked Save");
              console.log("dashboardId = " + args.dashboardId);
              console.log("name = " + args.name);
              console.log("isNew = " + args.isNew);
              console.log("saveAs = " + args.saveAs);

              args.saveFinished();
          }
  }

  title = 'reveal-first';
  dashboard?: string;  

  options: RevealViewOptions = {
    startInEditMode: true
  }

  private isDuplicateName(name: any) {
    return fetch(`http://localhost:5111/isduplicatename/${name}`).then(resp => resp.text());
  }
}