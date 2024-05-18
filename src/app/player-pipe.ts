import { Pipe, PipeTransform } from '@angular/core';
import { Player } from './player';

@Pipe({
  standalone: true,
  name: 'playerPipe'
})
export class playerPipe implements PipeTransform {
  transform(player: Player): string {
    return player.name+": wears the shirt number "+player.shirtNum+" for "+player.team
  }
}