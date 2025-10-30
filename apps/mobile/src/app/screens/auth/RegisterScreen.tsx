/**
 * Register Screen
 * User registration screen with React Hook Form + Zod validation
 */

import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { AuthStackParamList } from "../../navigation/types";
import { registerSchema, type RegisterFormData } from "@/features/auth/types";
import { useRegister } from "@/features/auth/hooks";
import { colors, spacing, borderRadius, typography, shadows } from '../../shared/theme';

type NavigationProp = NativeStackNavigationProp<AuthStackParamList, "Register">;

export default function RegisterScreen() {
  const navigation = useNavigation<NavigationProp>();

  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState<string>("");

  // React Hook Form with Zod validation
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setError,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur", // Validate on blur
    defaultValues: {
      full_name: "",
      email: "",
      phone: "",
      password: "",
    },
  });

  // Register mutation hook
  const { mutate: register, isPending } = useRegister({
    onSuccess: (response) => {
      Alert.alert(
        "Success",
        response.message || "Account created successfully! Welcome to Wani."
      );
    },
    onError: (error: any) => {
      console.error("Registration error:", error);

      if (error?.code === "EMAIL_ALREADY_EXISTS") {
        setError("email", {
          type: "manual",
          message: "This email is already registered",
        });
      } else if (error?.code === "INVALID_PHONE") {
        setError("phone", {
          type: "manual",
          message: "Invalid phone number format",
        });
      } else {
        const errorMessage =
          error?.message || "Failed to create account. Please try again.";
        setApiError(errorMessage);
        Alert.alert("Registration Failed", errorMessage);
      }
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    setApiError("");
    register({
      ...data,
      phone: data.phone || undefined,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.card}>
            {/* Logo */}
            <View style={styles.logoContainer}>
              <Image
                source={require("../../../../assets/images/logo-horizontal-naranja.png")}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>

            {/* Header */}
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Join Wani today</Text>

            {/* General API Error */}
            {apiError && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{apiError}</Text>
              </View>
            )}

            {/* Full Name Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                Full Name<Text style={styles.required}> *</Text>
              </Text>
              <Controller
                control={control}
                name="full_name"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[styles.input, errors.full_name && styles.inputError]}
                    placeholder="John Doe"
                    placeholderTextColor="#9CA3AF"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    autoCapitalize="words"
                    editable={!isPending}
                  />
                )}
              />
              {errors.full_name && (
                <Text style={styles.errorFieldText}>
                  {errors.full_name.message}
                </Text>
              )}
            </View>

            {/* Email Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                Email<Text style={styles.required}> *</Text>
              </Text>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[styles.input, errors.email && styles.inputError]}
                    placeholder="you@example.com"
                    placeholderTextColor="#9CA3AF"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    editable={!isPending}
                  />
                )}
              />
              {errors.email && (
                <Text style={styles.errorFieldText}>
                  {errors.email.message}
                </Text>
              )}
            </View>

            {/* Phone Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Phone Number (Optional)</Text>
              <Controller
                control={control}
                name="phone"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[styles.input, errors.phone && styles.inputError]}
                    placeholder="+1 (555) 000-0000"
                    placeholderTextColor="#9CA3AF"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    keyboardType="phone-pad"
                    editable={!isPending}
                  />
                )}
              />
              {errors.phone && (
                <Text style={styles.errorFieldText}>
                  {errors.phone.message}
                </Text>
              )}
            </View>

            {/* Password Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                Password<Text style={styles.required}> *</Text>
              </Text>
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View style={styles.passwordContainer}>
                    <TextInput
                      style={[styles.input, errors.password && styles.inputError, styles.passwordInput]}
                      placeholder="••••••••"
                      placeholderTextColor="#9CA3AF"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      secureTextEntry={!showPassword}
                      autoCapitalize="none"
                      autoCorrect={false}
                      editable={!isPending}
                    />
                    <TouchableOpacity
                      style={styles.showPasswordButton}
                      onPress={() => setShowPassword(!showPassword)}
                    >
                      <Text style={styles.showPasswordText}>
                        {showPassword ? "Hide" : "Show"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              />
              {errors.password && (
                <Text style={styles.errorFieldText}>
                  {errors.password.message}
                </Text>
              )}
            </View>

            {/* Password Requirements */}
            <View style={styles.passwordRequirements}>
              <Text style={styles.passwordRequirementsText}>
                Password must be at least 8 characters with uppercase,
                lowercase, and number.
              </Text>
            </View>

            {/* Register Button */}
            <TouchableOpacity
              style={[styles.submitButton, isPending && styles.submitButtonDisabled]}
              onPress={handleSubmit(onSubmit)}
              disabled={isPending}
            >
              {isPending ? (
                <ActivityIndicator color={colors.white} />
              ) : (
                <Text style={styles.submitButtonText}>
                  Create Account
                </Text>
              )}
            </TouchableOpacity>

            {/* Login Link */}
            <View style={styles.linkContainer}>
              <Text style={styles.linkText}>
                Already have an account?{" "}
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("Login")}
                disabled={isPending}
              >
                <Text style={styles.linkTextAccent}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Terms and Privacy */}
          <View style={styles.termsContainer}>
            <Text style={styles.termsText}>
              By creating an account, you agree to our Terms of Service and
              Privacy Policy
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cream,
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingVertical: spacing.xl,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    ...shadows.lg,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  logo: {
    height: 80,
    width: 240,
  },
  title: {
    fontSize: typography.sizes.xxxxl,
    fontWeight: typography.weights.bold,
    color: colors.brown,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: typography.sizes.base,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  errorContainer: {
    backgroundColor: '#FEE2E2',
    borderWidth: 1,
    borderColor: '#FECACA',
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  errorText: {
    color: '#DC2626',
    fontSize: typography.sizes.sm,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: spacing.md,
  },
  label: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: colors.brown,
    marginBottom: spacing.sm,
  },
  required: {
    color: '#EF4444',
  },
  input: {
    backgroundColor: colors.bgGray,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    color: colors.brown,
    fontSize: typography.sizes.base,
  },
  inputError: {
    borderWidth: 1,
    borderColor: '#EF4444',
  },
  passwordContainer: {
    position: 'relative',
  },
  passwordInput: {
    paddingRight: 60,
  },
  showPasswordButton: {
    position: 'absolute',
    right: spacing.md,
    top: spacing.md,
  },
  showPasswordText: {
    color: colors.textSecondary,
    fontSize: typography.sizes.sm,
  },
  errorFieldText: {
    color: '#EF4444',
    fontSize: typography.sizes.xs,
    marginTop: 4,
  },
  passwordRequirements: {
    marginBottom: spacing.lg,
  },
  passwordRequirementsText: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
  },
  submitButton: {
    backgroundColor: colors.coral,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.md,
    ...shadows.md,
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitButtonText: {
    color: colors.white,
    textAlign: 'center',
    fontWeight: typography.weights.semibold,
    fontSize: typography.sizes.lg,
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  linkText: {
    color: colors.textSecondary,
    fontSize: typography.sizes.base,
  },
  linkTextAccent: {
    color: colors.coral,
    fontWeight: typography.weights.semibold,
    fontSize: typography.sizes.base,
  },
  termsContainer: {
    marginTop: spacing.lg,
    paddingHorizontal: spacing.md,
  },
  termsText: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
