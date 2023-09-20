package com.example.covid19api.DataService;
import com.example.covid19api.DTO.CovidData;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import java.util.*;


@Service
public class CovidDataServiceImpl implements CovidDataService{
    private final String API_URL = "https://api.covidtracking.com/v1/states/";

    private final RestTemplate restTemplate;

    public CovidDataServiceImpl() {
        this.restTemplate = new RestTemplate();
    }

    @Override
    public List<CovidData> fetchCovidDataForState(String state) {
        ParameterizedTypeReference<List<CovidData>> responseType = new ParameterizedTypeReference<List<CovidData>>() {};
        ResponseEntity<List<CovidData>> responseEntity = restTemplate.exchange(
            API_URL+state+"/daily.json",
            HttpMethod.GET,
            null, // Request entity (you can add headers or a request body if needed)
            responseType // Specify the expected response type
        );
        List<CovidData> covidDataList = responseEntity.getBody();

        return covidDataList;
    }
}

