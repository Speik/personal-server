import {
  KeyboardLayout,
  Row,
  Button,
  Redirect,
  Callback,
} from './declarations';

import { TelegramHandler } from '../telegram.handler';

const CERTIFICATES_LAYOUT: KeyboardLayout = {
  name: 'certificates',
  message: "Let's check out your certificates...",
  rows: [
    Row(Button('👀 Show Certificates'), Button('🆕 Add Certificate')),
    Row(Button('◀️ Return to Main', Redirect('default'))),
  ],
};

const JOURNEY_LAYOUT: KeyboardLayout = {
  name: 'journey',
  message: "Let's dive into your journey...",
  rows: [
    Row(Button('👀 Show Journey'), Button('🆕 Add Place')),
    Row(Button('◀️ Return to Main', Redirect('default'))),
  ],
};

const SKILLS_LAYOUT: KeyboardLayout = {
  name: 'skills',
  message: "Let's summarise your skills...",
  rows: [
    Row(Button('👀 Show Skills'), Button('🆕 Add Skill')),
    Row(Button('◀️ Return to Main', Redirect('default'))),
  ],
};

const DEFAULT_LAYOUT: KeyboardLayout = {
  name: 'default',
  message: 'What do we do?',
  rows: [
    Row(
      Button('⚡️ Skills', Redirect('skills')),
      Button('👨‍💻 Journey', Redirect('journey')),
    ),
    Row(
      Button('⭐️ Certificates', Redirect('certificates')),
      Button(
        '🔗 Social Links',
        Redirect(null),
        Callback(TelegramHandler.showSocial),
      ),
    ),
    Row(
      Button('📩 Inbox', Redirect(null), Callback(TelegramHandler.showInbox)),
      Button('📗 My CV', Redirect(null), Callback(TelegramHandler.showResume)),
    ),
  ],
};

export { DEFAULT_LAYOUT, SKILLS_LAYOUT, JOURNEY_LAYOUT, CERTIFICATES_LAYOUT };
