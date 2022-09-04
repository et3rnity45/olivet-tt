import MD5 from 'crypto-js/md5';
import HmacSHA1 from 'crypto-js/hmac-sha1';
import dateFormat from 'dateformat';
import axios from 'axios';
import iconv from 'iconv-lite';
import { parseString } from 'xml2js';
import { Player } from '../entities/player.entity';
import { Team } from '../entities/team.entity';
import { Poule } from '../entities/poule.entity';

const API_URL = 'http://www.fftt.com/mobile/pxml';
const NUMCLUB = '04450410';
const params = {
  id: '',
  serie: '',
  tm: '',
  tmc: '',
};

const updateParams = (): void => {
  const key = MD5(process.env.FFTT_PASSWORD as string).toString();

  params.id = process.env.FFTT_ID as string;
  params.serie = process.env.FFTT_SERIE as string;
  params.tm = dateFormat(new Date(), 'yyyymmddHHMMssl');
  params.tmc = HmacSHA1(params.tm, key).toString();
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const callApi = async (route: string, addParams: Record<string, unknown>): Promise<any> => {
  let apiResponse;

  updateParams();
  await axios.get(`${API_URL}/${route}`, { responseType: 'arraybuffer', params: { ...params, ...addParams } })
    .then((buffer) => {
      const response = iconv.decode(buffer.data, 'ISO-8859-1');
      parseString(response, { explicitArray: false }, (err, result) => {
        apiResponse = result;
      });
    })
    .catch((err) => {
      throw new Error(err);
    });

  return apiResponse;
};

export const getPlayerInfo = async (licence: string): Promise<Player> => {
  const response = await callApi('xml_joueur.php', { licence });
  const player: Player = response.liste.joueur;

  return player;
};

export const getClubPlayers = async (): Promise<Player[]> => {
  const response = await callApi('xml_liste_joueur.php', { club: NUMCLUB });
  let players: Player[] = response.liste.joueur;
  players = await Promise.all(players.map(async (player) => getPlayerInfo(player.licence)));

  return players;
};

export const getTeamsWithResult = async (poule: Poule): Promise<Team[]> => {
  const variables = poule.liendivision.match(/(?<==)(.*?)(?=&)/g);
  if (!variables) throw new Error('no variables found');

  const response = await callApi('xml_result_equ.php', {
    action: 'classement', auto: 1, D1: variables[1], cx_poule: variables[0],
  });
  const teams: Team[] = response.liste.classement;

  return teams;
};

export const getPoules = async (): Promise<Poule[]> => {
  const response = await callApi('xml_equipe.php', { numclu: NUMCLUB, type: 'A' });
  const poules: Poule[] = response.liste.equipe;

  return poules;
};
