import 'dart:convert';
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:http_parser/http_parser.dart';
import 'package:image_picker/image_picker.dart';

void main() {
  runApp(const MainApp());
}

double prediction = 0.0;

class MainApp extends StatefulWidget {
  const MainApp({Key? key}) : super(key: key);

  @override
  State<MainApp> createState() => _MainAppState();
}

class _MainAppState extends State<MainApp> {
  double predictionPercentage = 0.0;

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: const Text(
            'EyeAI',
            style: TextStyle(fontSize: 28, fontWeight: FontWeight.bold),
          ),
        ),
        body: SafeArea(
          child: Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                UploadImageButton(
                  onPredictionChanged: (prediction) {
                    setState(() {
                      predictionPercentage = prediction;
                    });
                  },
                ),
                if (predictionPercentage == 0.0)
                  Text('No prediction yet')
                else if (predictionPercentage != 0.0 &&
                    predictionPercentage > 90)
                  const Text("You have Diabetic Retinopathy")
                else
                  const Text("You don't have Diabetic Retinopathy")
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class UploadImageButton extends StatefulWidget {
  final Function(double) onPredictionChanged;

  const UploadImageButton({Key? key, required this.onPredictionChanged})
      : super(key: key);

  @override
  _UploadImageButtonState createState() => _UploadImageButtonState();
}

class _UploadImageButtonState extends State<UploadImageButton> {
  bool _isLoading = false;

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: _isLoading ? null : _pickAndUploadImage,
      child: _isLoading
          ? CircularProgressIndicator()
          : const Text('Upload picture'),
    );
  }

  Future<void> _pickAndUploadImage() async {
    setState(() {
      _isLoading = true;
    });

    File? imageFile = await getImageFromGallery();
    if (imageFile != null) {
      String url = 'http://127.0.0.1:5000/api/image';
      prediction = await uploadPicture(imageFile, url);
      widget.onPredictionChanged(prediction);
    }

    setState(() {
      _isLoading = false;
    });
  }

  Future<File?> getImageFromGallery() async {
    final picker = ImagePicker();
    final pickedFile = await picker.pickImage(source: ImageSource.gallery);
    if (pickedFile != null) {
      return File(pickedFile.path);
    }
    return null;
  }

  Future<double> uploadPicture(File imageFile, String url) async {
    if (imageFile == null) {
      return 0.0;
    }

    try {
      var request = http.MultipartRequest('POST', Uri.parse(url));
      request.files.add(await http.MultipartFile.fromPath(
          'image', imageFile.path,
          contentType: MediaType('image', 'jpeg')));
      var response = await request.send();

      if (response.statusCode == 200) {
        final decodedResponse = await response.stream.bytesToString();
        final jsonResponse = json.decode(decodedResponse);
        final firstPrediction = jsonResponse['predictions'][0][0];
        final firstPredictionPercentage =
            (firstPrediction * 100).toStringAsFixed(2);
        print('First prediction: $firstPredictionPercentage%');
        return firstPrediction * 100;
      } else {
        print(
            'Failed to upload image. Error: ${response.reasonPhrase} ${response.statusCode}');
        return 0.0;
      }
    } catch (e) {
      print('Error uploading image: $e');
      return 0.0;
    }
  }
}
