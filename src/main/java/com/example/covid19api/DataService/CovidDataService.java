package com.example.covid19api.DataService;

import com.example.covid19api.DTO.CovidData;

import java.util.List;

public interface CovidDataService {
;
    public List<CovidData> fetchCovidDataForState(String state);
}
