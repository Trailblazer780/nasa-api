// -------------------------------------- Astronomy Picture of the Day --------------------------------------
export interface APODData {
    copyright: string;
    date: string;
    explanation: string;
    hdurl: string;
    media_type: string;
    service_version: string;
    title: string;
    url: string;
}

let newDate = new Date()
let date = newDate.getDate();
let month = newDate.getMonth() + 1;
let year = newDate.getFullYear();

let fullDate:string = year + "-" + month + "-" + date;
console.log(date + "/" + month + "/" + year);

// ---------------------------------------- Asteroid Data ----------------------------------------
export interface AsteroidTodayData {
    links: Links;
    element_count: number;
    near_earth_objects: AsteroidToday;
}

export interface Links{
    self: string;
    next: string;
    prev: string;
}

export interface AsteroidToday {
    '2022-01-18': Asteroid[];
}

export interface Asteroid {
    id: string;
    neo_reference_id: string;
    name: string;
    nasa_jpl_url: string;
    absolute_magnitude_h: number;
    estimated_diameter: EstimatedDiameter;
    is_potentially_hazardous_asteroid: boolean;
    close_approach_data: CloseApproachData[];
    is_sentry_object: boolean;
}

export interface EstimatedDiameter {
    kilometers: Kilometers;
    meters: Meters;
    miles: Miles;
    feet: Feet;
}

export interface Kilometers {
    estimated_diameter_min: number;
    estimated_diameter_max: number;
}

export interface Meters {
    estimated_diameter_min: number;
    estimated_diameter_max: number;
}

export interface Miles {
    estimated_diameter_min: number;
    estimated_diameter_max: number;
}

export interface Feet {
    estimated_diameter_min: number;
    estimated_diameter_max: number;
}

export interface CloseApproachData {
    close_approach_data: CloseApproach[];
}

export interface CloseApproach {
    close_approach_date: string;
    close_approach_date_full: string;
    epoch_date_close_approach: number;
    relative_velocity: RelativeVelocity;
    miss_distance: MissDistance;
    orbiting_body: string;
}

export interface RelativeVelocity {
    kilometers_per_second: number;
    kilometers_per_hour: number;
    miles_per_hour: number;
}

export interface MissDistance {
    astronomical: number;
    lunar: number;
    kilometers: number;
    miles: number;
}

// ---------------------------------------- Web Application Data ----------------------------------------
export interface HomeProps {
    setLoading:Function;
}

export interface LoadingOverlayProps {
    enabled:boolean;
    bgColor:string;
    spinnerColor:string;
}
