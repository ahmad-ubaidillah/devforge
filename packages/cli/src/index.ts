#!/usr/bin/env bun
import { Command } from 'commander';
import { registerCreatePluginCommand } from './commands/create-plugin';
import { registerUICommand } from './commands/ui';
import { registerCreateCommand } from './commands/create';
import { registerAddCommand } from './commands/add';
import { registerListCommand } from './commands/list';
import { registerAICommand } from './commands/ai';
import { registerDoctorCommand } from './commands/doctor';

import { registerGainCommand } from './commands/gain';

export function createProgram() {
  const program = new Command();

  program
    .name('devforge-cli')
    .description('Modular Boilerplate Ecosystem for Modern Web Apps')
    .version('1.0.0');

  // Register all commands
  registerCreateCommand(program);
  registerAddCommand(program);
  registerListCommand(program);
  registerUICommand(program);
  registerCreatePluginCommand(program);
  registerAICommand(program);
  registerDoctorCommand(program);
  registerGainCommand(program);

  return program;
}
