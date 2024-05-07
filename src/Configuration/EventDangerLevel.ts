export enum EventDangerLevel {
	NOT_SPECIFIED = 0,
	SMALL = 1,
	MEDIUM = 2,
	HIGH = 3,
	VERY_HIGH = 4,
}

export const EventDangerLevelOptions = [
	{ label: 'ไม่ระบุ', value: EventDangerLevel.NOT_SPECIFIED },
	{ label: 'ระดับ1 สาธารณภัยขนาดเล็ก', value: EventDangerLevel.SMALL },
	{ label: 'ระดับ2 สาธารณภัยขนาดกลาง', value: EventDangerLevel.MEDIUM },
	{ label: 'ระดับ3 สาธารณภัยขนาดใหญ่', value: EventDangerLevel.HIGH },
	{ label: 'ระดับ4 สาธารณภัยขนาดร้ายแรงอย่างยิ่ง', value: EventDangerLevel.VERY_HIGH },
]
