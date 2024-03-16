// Define un diccionario que mapea comandos de DuckyScript a comandos de JavaScript de Flipper Zero
const command_mapping = {
    "STRING": "badusb.println('{}');",
    "DELAY": "delay({});",
    "GUI": "badusb.press('GUI', '{}');",
    "CTRL": "badusb.press('CTRL', '{}');",
    "ALT": "badusb.press('ALT', '{}');",
    "SHIFT": "badusb.press('SHIFT', '{}');",
    "ENTER": "badusb.press('ENTER');",
    "TAB": "badusb.press('TAB');",
    "ESC": "badusb.press('ESC');",
    "CAPSLOCK": "badusb.press('CAPS_LOCK');",
    "DELETE": "badusb.press('DEL');",
    "INSERT": "badusb.press('INS');",
    "UPARROW": "badusb.press('UP');",
    "DOWNARROW": "badusb.press('DOWN');",
    "LEFTARROW": "badusb.press('LEFT');",
    "RIGHTARROW": "badusb.press('RIGHT');",
    "SPACE": "badusb.press('SPACE');",
    "WINDOWS": "badusb.press('WINDOWS');",
    "COMMAND": "badusb.press('COMMAND');",
};

// Mapea las teclas de función usando un bucle
for (let i = 1; i < 13; i++) {
    command_mapping[`F${i}`] = `badusb.press('F${i}');`;
}

export function translate_duckyscript_to_js(input_file) {
    let scriptBase = (jsCode) => (`/* Flipper Zero JavaScript BasUSB */
const badusb = require('badusb');
const notify = require('notification');
const flipper = require('flipper');
const dialog = require('dialog');

badusb.setup({ vid: 0xAAAA, pid: 0xBBBB, mfr_name: 'Flipper', prod_name: 'Zero' });

dialog.message('BADUSB', 'Press OK to start');

if (badusb.isConnected()) {
    notify.blink('green', 'short');
    console.log('USB is connected');\n${jsCode}

    notify.success();
} else {
    console.log('USB not connected');
    notify.error();
}

// Opcional, pero permite intercambiar con usbdisk
badusb.quit();
    `);
    let jsCode = '';
    // Convierte DuckyScript a JavaScript de Flipper Zero
    const lines = input_file.split('\n');
    for (let line of lines) {
        line = line.trim();
        if (!line || line.startsWith("REM")) {
            continue;  // Omite líneas vacías y comentarios
        }
        const parts = line.split(/\s+/);
        const command = parts[0];
        const args = parts.slice(1).join(' ');
        if (command in command_mapping) {
            const js_command = command_mapping[command].replace('{}', args).replace(/'/g, "\'");
            jsCode += `\t${js_command}\n`;
        } else {
            console.warn(`Warning: Unsupported DuckyScript command '${command}'`);
        }
    }


    return scriptBase(jsCode);
}