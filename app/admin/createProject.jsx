import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import CustomSelectPicker from "../customSelect";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

const CreateProject = () => {
  const [projectName, setProjectName] = useState("");
  const [projectLocation, setProjectLocation] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [expectedReturn, setExpectedReturn] = useState("");
  const [maximumInvestment, setMaximumInvestment] = useState("");
  const [minimumInvestment, setMinimumInvestment] = useState("");
  const [projectPhoto, setProjectPhoto] = useState(null);
  const [projectPhotoBase64, setProjectPhotoBase64] = useState("");

  const projectTypes = [
    { value: "own", label: "Own project" },
    { value: "outside", label: "Outside project" },
  ];
  const landlordTypes = [
    { value: "ownership", label: "Ownership project" },
    { value: "rental", label: "Rental project" },
  ];
  const closingTypes = [
    { value: "day", label: "Day" },
    { value: "week", label: "Week" },
    { value: "month", label: "Month" },
  ];

  const [selectedProjectType, setSelectedProjectType] = useState("own");
  const [selectedLandlordType, setSelectedLandlordType] = useState("ownership");
  const [selectedClosingType, setSelectedClosingType] = useState("day");
  const [errors, setErrors] = useState({});

  const handleSave = () => {
    let valid = true;
    let newErrors = {};

    if (!projectName.trim()) {
      newErrors.projectName = "Project name is required.";
      valid = false;
    }
    if (!projectLocation.trim()) {
      newErrors.projectLocation = "Project location is required.";
      valid = false;
    }
    if (!projectDescription.trim()) {
      newErrors.projectDescription = "Project description is required.";
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      const projectData = {
        projectName,
        projectLocation,
        projectDescription,
        projectType: selectedProjectType,
        landlordType: selectedLandlordType,
        closingType: selectedClosingType,
        expectedReturn,
        maximumInvestment,
        minimumInvestment,
        projectPhoto: projectPhotoBase64,
      };

      // Save projectData to your desired location or process it further
      console.log("Project data:", projectData);
      alert("Success", "Project saved successfully!");
    }
  };

  const handleChange = (name, value) => {
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    switch (name) {
      case "projectName":
        setProjectName(value);
        break;
      case "projectLocation":
        setProjectLocation(value);
        break;
      case "projectDescription":
        setProjectDescription(value);
        break;
      case "expectedReturn":
        setExpectedReturn(value);
        break;
      case "maximumInvestment":
        setMaximumInvestment(value);
        break;
      case "minimumInvestment":
        setMinimumInvestment(value);
        break;
      default:
        break;
    }
  };

  const handleValueChange = (pickerName, value) => {
    switch (pickerName) {
      case "projectType":
        setSelectedProjectType(value);
        break;
      case "landlordType":
        setSelectedLandlordType(value);
        break;
      case "closingType":
        setSelectedClosingType(value);
        break;
      default:
        break;
    }
  };

  const selectProjectPhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.cancelled) {
      setProjectPhoto(result.uri);
      const base64 = await convertImageToBase64(result.uri);
      setProjectPhotoBase64(base64);
    }
  };

  const convertImageToBase64 = async (uri) => {
    try {
      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      await FileSystem.deleteAsync(uri); // Delete the local file
      return `data:image/jpeg;base64,${base64}`;
    } catch (error) {
      console.error('Error converting image to base64:', error);
      return '';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Create Project</Text>
      </View>
      <ScrollView style={styles.form}>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, errors.projectName && styles.inputError]}
            placeholder="Project name *"
            value={projectName}
            onChangeText={(value) => handleChange("projectName", value)}
          />
          {errors.projectName && (
            <Text style={styles.errorText}>{errors.projectName}</Text>
          )}
        </View>
        <CustomSelectPicker
          data={projectTypes}
          selectedValue={selectedProjectType}
          onValueChange={(value) => handleValueChange("projectType", value)}
        />
        <CustomSelectPicker
          data={landlordTypes}
          selectedValue={selectedLandlordType}
          onValueChange={(value) => handleValueChange("landlordType", value)}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, errors.projectLocation && styles.inputError]}
            placeholder="Project location *"
            value={projectLocation}
            onChangeText={(value) => handleChange("projectLocation", value)}
          />
          {errors.projectLocation && (
            <Text style={styles.errorText}>{errors.projectLocation}</Text>
          )}
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={[
              styles.input,
              errors.projectDescription && styles.inputError,
            ]}
            placeholder="Project description *"
            value={projectDescription}
            onChangeText={(value) => handleChange("projectDescription", value)}
          />
          {errors.projectDescription && (
            <Text style={styles.errorText}>{errors.projectDescription}</Text>
          )}
        </View>
        <TextInput
          style={styles.input}
          placeholder="Expected return"
          keyboardType="numeric"
          value={expectedReturn}
          onChangeText={(value) => handleChange("expectedReturn", value)}
        />
        <CustomSelectPicker
          data={closingTypes}
          selectedValue={selectedClosingType}
          onValueChange={(value) => handleValueChange("closingType", value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Maximum investment"
          keyboardType="numeric"
          value={maximumInvestment}
          onChangeText={(value) => handleChange("maximumInvestment", value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Minimum investment"
          keyboardType="numeric"
          value={minimumInvestment}
          onChangeText={(value) => handleChange("minimumInvestment", value)}
        />

        <TouchableOpacity onPress={selectProjectPhoto} style={styles.uploadButton}>
          <Text style={styles.uploadButtonText}>Upload Project Photo</Text>
        </TouchableOpacity>
        {projectPhoto ? (
          <Image source={{ uri: projectPhoto }} style={styles.projectPhoto} />
        ) : null}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>SAVE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#1C1C1E",
    paddingBottom: 70,
  },
  header: {
    alignItems: "center",
    marginTop: 20,
  },
  headerTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  form: {
    marginVertical: 20,
  },
  inputContainer: {
    marginVertical: 10,
  },
  input: {
    backgroundColor: "rgba(46, 46, 46, 0.8)",
    color: "white",
    borderRadius: 10,
    padding: 15,
    marginTop: 5,
  },
  inputError: {
    borderColor: "red",
    borderWidth: 1,
  },
  errorText: {
    color: "red",
    marginTop: 5,
  },
  uploadButton: {
    backgroundColor: "#FF6B6B",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    marginTop: 20,
  },
  uploadButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  projectPhoto: {
    width: "100%",
    height: 200,
    marginTop: 20,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
  },
  saveButton: {
    backgroundColor: "#FF6B6B",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});

export default CreateProject;
