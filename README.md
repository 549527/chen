def calculate_discounted_price(price, discount):
    """
    Returns the price after applying the discount.
    """
    if not (0 <= discount <= 1):
        raise ValueError("Discount must be between 0 and 1.")
    return round(price * (1 - discount), 2)


def is_prime(n):
    """
    Check if a number is a prime number.
    """
    if n < 2:
        return False
    for i in range(2, int(n ** 0.5) + 1):
        if n % i == 0:
            return False
    return True
