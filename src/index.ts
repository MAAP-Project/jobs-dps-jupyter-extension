import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { MainAreaWidget } from '@jupyterlab/apputils';
import { ILauncher } from '@jupyterlab/launcher';
import { reactIcon } from '@jupyterlab/ui-components';
import { JobsWidget } from './JobsWidget';

namespace CommandIDs {
  export const create = 'jobs-widget';
}

/**
 * Initialization data for the jobs react-widget extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'jobs-react-widget',
  autoStart: true,
  optional: [ILauncher],
  activate: (app: JupyterFrontEnd, launcher: ILauncher) => {
    const { commands } = app;
    const command = CommandIDs.create;
    commands.addCommand(command, {
      caption: 'Manage Jobs',
      label: 'Jobs',
      icon: args => (args['isPalette'] ? "" : reactIcon),
      execute: () => {
        const content = new JobsWidget();
        const widget = new MainAreaWidget<JobsWidget>({ content });
        widget.title.label = 'Jobs Widget';
        app.shell.add(widget, 'main');
      }
    });

    if (launcher) {
      launcher.add({
        command
      });
    }
  }
};

export default extension;