import { TelegramHandler } from '../telegram.handler';

import {
  KeyboardLayout,
  Row,
  Button,
  Redirect,
  Callback,
} from './declarations';

const CertificatesStaticLayout = (
  handler: TelegramHandler,
): KeyboardLayout => ({
  name: 'certificates',
  message: "Let's check out your certificates...",
  rows: [
    Row(Button('👀 Show Certificates'), Button('🆕 Add Certificate')),
    Row(Button('◀️ Return to Main', Redirect('default'))),
  ],
});

const JourneyStaticLayout = (handler: TelegramHandler): KeyboardLayout => ({
  name: 'journey',
  message: "Let's dive into your journey...",
  rows: [
    Row(Button('👀 Show Journey'), Button('🆕 Add Place')),
    Row(Button('◀️ Return to Main', Redirect('default'))),
  ],
});

const SkillsStaticLayout = (handler: TelegramHandler): KeyboardLayout => ({
  name: 'skills',
  message: "Let's summarise your skills...",
  rows: [
    Row(
      Button('👀 Show Skills', null, Callback(handler, 'showSkills')),
      Button('🆕 Add Skill'),
    ),
    Row(Button('◀️ Return to Main', Redirect('default'))),
  ],
});

const DefaultStaticLayout = (handler: TelegramHandler): KeyboardLayout => ({
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
        Callback(handler, 'showSocial'),
      ),
    ),
    Row(
      Button('📩 Inbox', Redirect(null), Callback(handler, 'showInbox')),
      Button('📗 My CV', Redirect(null), Callback(handler, 'showResume')),
    ),
  ],
});

export {
  DefaultStaticLayout,
  SkillsStaticLayout,
  JourneyStaticLayout,
  CertificatesStaticLayout,
};
