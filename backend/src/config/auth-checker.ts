import { AuthChecker } from 'type-graphql';
import { Payload } from '../utils/auth';

const authChecker: AuthChecker<Payload> = ({ context: { user } }) => user !== undefined;

export default authChecker;
