/*
openrqm-client-desktop-nwjs
RQMSettings Model
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2020 Benjamin Schilling
*/

export class RQMSettingsModel {
    constructor(public serverIpAddress: string, public serverPort: number) {
    }
}