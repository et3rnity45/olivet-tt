import MD5 from 'crypto-js/md5';
import HmacSHA1 from 'crypto-js/hmac-sha1';
import dateFormat from 'dateformat';
import axios from 'axios';
import iconv from 'iconv-lite';
import { parseString } from 'xml2js';
import { Player } from '@Entities/player.entity';
import { Team } from '@Entities/team.entity';
import { Poule } from '@Entities/poule.entity';

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

const getPlayerInfo = async (licence: string): Promise<Player> => {
  let player: Player = new Player();

  updateParams();
  await axios.get(`${API_URL}/xml_joueur.php`, { params: { ...params, licence }, responseType: 'arraybuffer' })
    .then((response) => {
      const decodedReponse = iconv.decode(response.data, 'ISO-8859-1');
      parseString(decodedReponse, { explicitArray: false }, (err, result) => {
        player = result.liste.joueur;
      });
    })
    .catch((err) => {
      throw new Error(err);
    });

  return player;
};

export const getClubPlayers = async (): Promise<Player[]> => {
  let players: Player[] = [];

  updateParams();
  await axios.get(`${API_URL}/xml_liste_joueur.php`, { params: { ...params, club: NUMCLUB } })
    .then((response) => {
      parseString(response.data, { explicitArray: false }, (err, result) => {
        players = result.liste.joueur;
      });
    })
    .catch((err) => {
      throw new Error(err);
    });
  players = await Promise.all(players.map(async (player) => getPlayerInfo(player.licence)));

  return players;
};

export const getTeamsWithResult = async (poule: Poule): Promise<Team[]> => {
  const variables = poule.liendivision.match(/(?<==)(.*?)(?=&)/g);
  if (!variables) throw new Error('no variables found');

  let teams: Team[] = [];

  updateParams();
  await axios.get(`${API_URL}/xml_result_equ.php`, {
    responseType: 'arraybuffer',
    params: {
      ...params, action: 'classement', auto: 1, D1: variables[1], cx_poule: variables[0],
    },
  })
    .then((response) => {
      const decodedReponse = iconv.decode(response.data, 'ISO-8859-1');
      parseString(decodedReponse, { explicitArray: false }, (err, result) => {
        teams = result.liste.classement;
      });
    });

  return teams;
};

export const getPoules = async (): Promise<Poule[]> => {
  let poules;

  updateParams();
  await axios.get(`${API_URL}/xml_equipe.php`, { responseType: 'arraybuffer', params: { ...params, numclu: NUMCLUB, type: 'A' } })
    .then((response) => {
      const decodedReponse = iconv.decode(response.data, 'ISO-8859-1');
      parseString(decodedReponse, { explicitArray: false }, (err, result) => {
        poules = result.liste.equipe;
      });
    })
    .catch((err) => {
      throw new Error(err);
    });
  if (!poules) throw new Error();

  return poules;
};
