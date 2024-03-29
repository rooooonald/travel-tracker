import { useContext, useState } from "react";
import useInput from "../hooks/use-input";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { ItineraryContext } from "../store/itinerary-context";

import { addTripToDatebase } from "../lib/db/save";

import AddTripCountries from "../components/trips/add-trip/AddTripCountries";
import AddTripTitle from "../components/trips/add-trip/AddTripTitle";
import AddTripDates from "../components/trips/add-trip/AddTripDates";
import AddTripCities from "../components/trips/add-trip/AddTripCities";
import ProgressBar from "../components/trips/add-trip/ProgressBar";
import ButtonPrimary from "../components/ui/buttons/ButtonPrimary";
import ButtonReturn from "../components/ui/buttons/ButtonReturn";
import PageLoader from "../components/ui/PageLoader";
import { checkChar, checkDate, checkEmpty } from "../lib/validations";

import styles from "./AddTrip.module.scss";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { BiSolidPlaneAlt } from "react-icons/bi";

export default function AddTripPage() {
  const [step, setStep] = useState(1);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [isCityWithoutCountry, setIsCityWithoutCountry] = useState(false);

  const navigate = useNavigate();
  const { resetDay } = useContext(ItineraryContext);
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: addTripToDatebase,
    onSuccess: (tripId) => {
      resetDay();
      navigate(`/trips/${tripId}`);
    },
  });

  const selectCountryHandler = (countryId) => {
    if (selectedCountries.includes(countryId)) {
      setSelectedCountries((prev) => prev.filter((id) => id !== countryId));
    } else {
      setSelectedCountries((prev) => [...prev, countryId]);
    }
  };

  const setCitiesHandler = (cityObj) => {
    setIsCityWithoutCountry(false);
    if (!cityObj.country) {
      setIsCityWithoutCountry(true);
      return;
    }

    const selectedCityIndex = cities.findIndex(
      (city) => city.name === cityObj.name && city.country === cityObj.country
    );

    if (selectedCityIndex < 0) {
      setCities((prev) => [...prev, cityObj]);
      return;
    }

    let updatedCityList = [...cities];
    updatedCityList = updatedCityList.filter(
      (city) => city.name !== cityObj.name || city.country !== cityObj.country
    );

    setCities(updatedCityList);
  };

  const submitHandler = () => {
    const data = {
      title: titleInput.value.trim(),
      dateFrom: dateFromInput.value,
      dateTo: dateToInput.value,
      countries: selectedCountries,
      cities,
    };

    mutate(data);
  };

  const switchStepHandler = (step) => {
    setStep((prev) => prev + step);
  };

  const titleInput = useInput((title) => checkChar(title, { maxChar: 20 }));
  const dateFromInput = useInput(checkEmpty);
  const dateToInput = useInput(checkDate, { dateFrom: dateFromInput.value });

  if (isPending) {
    return <PageLoader />;
  }

  return (
    <LazyMotion features={domAnimation}>
      <div className={styles.wrapper}>
        <m.img
          key={selectedCountries[selectedCountries.length - 1]}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className={styles.img}
          src={`/images/countries/${
            selectedCountries[selectedCountries.length - 1] || "JP"
          }.webp`}
        />
        <form className={styles.form}>
          <ProgressBar step={step} totalSteps={5} />

          {step === 1 && (
            <AddTripTitle
              titleInput={titleInput}
              onSwitchStep={switchStepHandler}
            />
          )}

          {step === 2 && (
            <AddTripDates
              dateFromInput={dateFromInput}
              dateToInput={dateToInput}
              onSwitchStep={switchStepHandler}
            />
          )}

          {step === 3 && (
            <AddTripCountries
              selectedCountries={selectedCountries}
              onSelect={selectCountryHandler}
              onSwitchStep={switchStepHandler}
            />
          )}

          {step === 4 && (
            <AddTripCities
              cities={cities}
              selectedCountries={selectedCountries}
              isCityWithoutCountry={isCityWithoutCountry}
              onSetCities={setCitiesHandler}
              onSwitchStep={switchStepHandler}
            />
          )}

          {step === 5 && (
            <div className={styles["completed-screen"]}>
              <div className={styles["completed-content"]}>
                <div className={styles["completed-graphic"]}>
                  <m.div
                    initial={{ x: -200, y: 200 }}
                    animate={{ x: 200, y: -200 }}
                    transition={{ duration: 3 }}
                  >
                    <BiSolidPlaneAlt style={{ fontSize: "25rem" }} />
                  </m.div>
                  <m.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.5 }}
                  >
                    READY?
                  </m.p>
                </div>
              </div>

              <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3 }}
                className={styles["btn-group"]}
              >
                <ButtonPrimary type="button" onClick={submitHandler}>
                  GET YOUR ITINERARY
                </ButtonPrimary>
                <ButtonReturn
                  type="button"
                  onClick={() => switchStepHandler(-1)}
                >
                  RETURN
                </ButtonReturn>
              </m.div>
            </div>
          )}
        </form>
      </div>
    </LazyMotion>
  );
}
