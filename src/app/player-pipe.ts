import { Pipe, PipeTransform } from '@angular/core';
import { Player } from './player';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/
@Pipe({
  standalone: true,
  name: 'playerPipe'
})
export class playerPipe implements PipeTransform {
  transform(player: Player): string {
    return player.name+": wears the shirt number "+player.shirtNum+" for "+player.team
  }
}