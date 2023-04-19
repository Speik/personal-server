import { TelegramContext } from '../telegram.context';

type KeyboardName = 'default' | 'skills' | 'journey' | 'certificates';

type KeyboardLayout = {
  name: KeyboardName;
  message: string;
  rows: KeyboardButton[][];
};

type KeyboardButton = {
  label: string;
  redirect?: Nullable<KeyboardName>;
  callback?: Nullable<Callback>;
};

type Callback = (ctx: TelegramContext) => Promise<void>;

const Row = (...buttons: KeyboardButton[]): KeyboardButton[] => buttons;

const Button = (
  label: string,
  redirect: Nullable<KeyboardName> = null,
  callback: Nullable<Callback> = null,
): KeyboardButton => ({ label, redirect, callback });

// Used only for better layout configuration semantics :)
const Redirect = (keyboardName?: Optional<KeyboardName>) => keyboardName;
const Callback = (callback: Callback) => callback;

export {
  KeyboardName,
  KeyboardLayout,
  KeyboardButton,
  Row,
  Button,
  Redirect,
  Callback,
};
