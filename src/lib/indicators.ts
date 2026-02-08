export interface IndicatorMetadata {
    code: string
    name: string
    description: string
    unit: string
    format: string // 'number' | 'percent' | 'currency'
    color: string
}

export const INDICATORS: Record<string, IndicatorMetadata> = {
    'NY.GDP.PCAP.CD': {
        code: 'NY.GDP.PCAP.CD',
        name: '1인당 GDP',
        description: '한 국가의 국내총생산(GDP)을 인구수로 나눈 값으로, 국민 개개인의 평균적인 경제 수준을 나타냅니다. 숫자가 높을수록 경제적으로 부유함을 의미합니다.',
        unit: 'USD ($)',
        format: 'currency',
        color: '#22c55e' // Green
    },
    'SP.POP.TOTL': {
        code: 'SP.POP.TOTL',
        name: '전체 인구',
        description: '국가에 거주하는 총 인구수입니다. 에너지 소비 규모와 탄소 배출량의 총량을 이해하는 데 중요한 기초 데이터입니다.',
        unit: '명',
        format: 'number',
        color: '#3b82f6' // Blue
    },
    'EG.USE.ELEC.KH.PC': {
        code: 'EG.USE.ELEC.KH.PC',
        name: '1인당 전력 소비량',
        description: '국민 한 사람이 연간 소비하는 평균 전력량입니다. 산업화 수준과 생활 수준을 반영하며, 높을수록 에너지 의존도가 큼을 의미합니다.',
        unit: 'kWh',
        format: 'number',
        color: '#eab308' // Yellow
    },
    'EG.FEC.RNEW.ZS': {
        code: 'EG.FEC.RNEW.ZS',
        name: '재생 에너지 소비 비중',
        description: '전체 최종 에너지 소비량 중에서 태양광, 풍력, 수력 등 재생 에너지가 차지하는 비율입니다. 친환경 에너지 전환의 척도입니다.',
        unit: '%',
        format: 'percent',
        color: '#10b981' // Emerald
    },
    'EG.USE.COMM.FO.ZS': {
        code: 'EG.USE.COMM.FO.ZS',
        name: '화석 연료 소비 비중',
        description: '석유, 석탄, 천연가스 등 화석 연료가 전체 에너지 소비에서 차지하는 비율입니다. 기후 변화의 주범인 온실가스 배출과 직결됩니다.',
        unit: '%',
        format: 'percent',
        color: '#ef4444' // Red
    },
    'EN.ATM.PM25.MC.M3': {
        code: 'EN.ATM.PM25.MC.M3',
        name: '미세먼지 농도 (PM2.5)',
        description: '대기 중 지름 2.5마이크로미터 이하의 초미세먼지 평균 농도입니다. 공기질과 호흡기 건강에 직접적인 영향을 미치는 환경 지표입니다.',
        unit: 'µg/m³',
        format: 'number',
        color: '#71717a' // Zinc
    },
    'AG.LND.FRST.ZS': {
        code: 'AG.LND.FRST.ZS',
        name: '산림 면적 비율',
        description: '국토 면적 대비 숲이 차지하는 비율입니다. 산림은 탄소를 흡수하고 생태계를 보존하는 중요한 역할을 합니다.',
        unit: '%',
        format: 'percent',
        color: '#15803d' // Green-700
    },
    'AG.LND.AGRI.ZS': {
        code: 'AG.LND.AGRI.ZS',
        name: '농지 면적 비율',
        description: '국토 면적 중 농업에 사용되는 토지의 비율입니다. 식량 안보와 토지 이용 변화를 보여줍니다.',
        unit: '%',
        format: 'percent',
        color: '#d97706' // Amber
    },
    'EG.USE.PCAP.KG.OE': {
        code: 'EG.USE.PCAP.KG.OE',
        name: '1인당 에너지 사용량 (석유 환산)',
        description: '모든 종류의 에너지를 석유(kg) 단위로 환산하여 국민 1인당 얼마나 소비하는지 보여주는 종합 에너지 지표입니다.',
        unit: 'kgOE',
        format: 'number',
        color: '#f97316' // Orange
    },
    'ER.H2O.INTR.PC': {
        code: 'ER.H2O.INTR.PC',
        name: '1인당 내부 담수 자원',
        description: '국내에서 생성되는 강물, 지하수 등의 담수 자원 총량을 인구수로 나눈 값입니다. 물 부족 국가 여부를 판단하는 기준이 됩니다.',
        unit: 'm³',
        format: 'number',
        color: '#0ea5e9' // Sky
    },
    'EG.ELC.RNEW.ZS': {
        code: 'EG.ELC.RNEW.ZS',
        name: '재생 전력 생산 비중',
        description: '전체 전력 생산량 중 재생 에너지로 생산된 전력의 비율입니다. 에너지 소비 비중과는 달리 발전(생산) 측면의 친환경성을 보여줍니다.',
        unit: '%',
        format: 'percent',
        color: '#84cc16' // Lime
    }
    // Note: Skipping 'EN.POP.EL5M.ZS' (only 30 records) and 'EN.CLC.MDAT.ZS' (only 10 records) due to insufficient data
}

export const getIndicatorList = () => Object.values(INDICATORS)
