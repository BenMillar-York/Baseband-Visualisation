let fourier_test_vectors = {};

fourier_test_vectors.dft =  [
    new TestVector(null, [1, 0, 1, 0], new Complex(0, 2)),
    new TestVector(null, [0, 1, 0, 1], new Complex(-7, 26)),
    new TestVector(null, new Complex(1, -0.9), new Complex(1.4, 2.36)),
    new TestVector(null, new Complex(1, -0.5), new Complex(1.5, -3.25)),
    new TestVector(null, new Complex(3535, -3535), new Complex(-12533324825, 12147691675))
]

fourier_test_vectors.idft =  [
    new TestVector(null, new Complex(1, 1), new Complex(1, 0)),
    new TestVector(null, new Complex(8, -4), new Complex(-0.8, -0.4666666666666667)),
    new TestVector(null, new Complex(1, -2), new Complex(4.5, 5)),
    new TestVector(null, new Complex(1, -0.5), new Complex(7, 4.5)),
    new TestVector(null, new Complex(3535, -3535), new Complex(-972.3839841539332, -972.3839841539332))
]

new UnitTest(discreteFourierTransform, null, fourier_test_vectors.dft);
new UnitTest(inverseFourierTransform, null, fourier_test_vectors.idft);